Meteor.publish('suppliers', function() {
  return Suppliers.find();
});

Meteor.publish('products', function() {
  return Products.find();
});