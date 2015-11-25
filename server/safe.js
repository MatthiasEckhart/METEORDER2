 createOrder: function(userId, supplierId) {
    check(supplierId, String);
    check(userId, String);

    var user = Meteor.users.findOne({_id: userId});
    var lastOrder = user.profile.currentOrder;
    var currentOrder = lastOrder + 1;

    Meteor.users.update({
            _id: userId
        }, {
            $inc: {
                "profile.currentOrder": 1
            }
        });

    if (!openOrderExists(supplierId)) {
        Orders.insert({
            user: userId,
            orderNumber: currentOrder,
            supplier: supplierId,
            orderItems: [],
            status: 0
        });

        console.log('order created maLord');

    } else {
        console.log('order already exists mLady');
    }
},
      
        
    
        
    