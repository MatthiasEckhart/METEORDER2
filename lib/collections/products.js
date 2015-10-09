Products = new Mongo.Collection('products');

Products.allow({
  update: function(userId, product) { return ownsDocument(userId, product); },
  remove: function(userId, product) { return ownsDocument(userId, product); },
});

Products.deny({
  update: function(userId, product, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'sku', 'description', 'category', 'unit', 'price').length > 0);
  }
});

Meteor.methods({
  productCreate: function(productAttributes) {
    check(this.userId, String);
    check(productAttributes, {
      sku: String,
      description: String,
      category: String,
      unit: String,
      price: String,
      supplierId: String
    });

    var errors = validateProduct(productAttributes);
    if (errors.sku || errors.description || errors.category || errors.unit || errors.price)
      throw new Meteor.Error('invalid-product', "You must all details for your product");

    var user = Meteor.user();
    var supplier = Suppliers.findOne(productAttributes.supplierId);
    if (!supplier)
      throw new Meteor.Error('invalid-product', 'You must create a product');
    product = _.extend(productAttributes, {
      userId: user._id,
      creator: user.username,
      created: new Date()
    });

    // update the supplier with the number of products
    Suppliers.update(product.supplierId, {$inc: {productsCount: 1}});
 
    return Products.insert(product);
  }
});

 

Products.deny({
  update: function(userId, product, fieldNames, modifier) {
    var errors = validateProduct(modifier.$set);
    return errors.sku || errors.description || errors.category || errors.unit || errors.price;
  }
});

validateProduct = function (product) {
  var errors = {};
  if (!product.sku)
    errors.sku = "Please fill in sku";
  if (!product.description)
    errors.description = "Please fill in description";
   if (!product.category)
    errors.category = "Please fill in category";
   if (!product.unit)
    errors.unit = "Please fill in unit";
   if (!product.price)
    errors.price = "Please fill in price";
  return errors;
}

