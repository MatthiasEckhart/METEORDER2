Meteor.publish('suppliers', function() {
  return Suppliers.find();
});

Meteor.publish('products', function(supplierId) {
  check(supplierId, String);
  return Products.find({supplierId: supplierId});
});