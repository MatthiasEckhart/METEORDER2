Meteor.publish('suppliers', function() {
  return Suppliers.find();
});