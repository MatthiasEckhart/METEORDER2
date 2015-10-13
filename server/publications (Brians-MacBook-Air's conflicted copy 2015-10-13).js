Meteor.publish('suppliers', function() {
	var currentUserId = this.userId;
  return Suppliers.find({
            userId: currentUserId
        });
});

Meteor.publish('products', function(supplierId) {
  check(supplierId, String);
  return Products.find({supplierId: supplierId});
});

Meteor.publish('orderitems', function() {
  
  return OrderItems.find({});
  console.log('published OrderItems');
});

