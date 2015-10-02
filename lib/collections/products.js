Products = new Mongo.Collection('products');

Meteor.methods({
  productCreate: function(productAttributes) {
    check(this.userId, String);
    check(productAttributes, {
      sku: String,
      description: String,
      unit: String,
      price: String,
      supplierId: String
    });
    var user = Meteor.user();
    var supplier = Suppliers.findOne(productAttributes.supplierId);
    if (!supplier)
      throw new Meteor.Error('invalid-product', 'You must create a product');
    product = _.extend(productAttributes, {
      userId: user._id,
      creator: user.username,
      created: new Date()
    });

    // update the post with the number of comments
    Suppliers.update(product.supplierId, {$inc: {productsCount: 1}});
 
    return Products.insert(product);
  }
});