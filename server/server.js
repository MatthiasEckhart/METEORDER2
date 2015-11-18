Meteor.methods({

    // BL added 20151109 
    createOrder: function(userId, supplierId) {
            check(supplierId, String);
            check(userId, String);
            if (!openOrderExists(supplierId)) {
                Orders.insert({
                    user: userId,
                    supplier: supplierId,
                    orderItems: [],
                    status: 0
                });
                console.log('order created maLord');
            } else {
                console.log('order already exists mLady');
            }
        },
        addToOrder: function(userId, selectedSupplier, qty, product, session) {
            check(userId, String);
            check(selectedSupplier, String);
            check(qty, Number);
            check(product, String);
            check(session, String);
            if (qty > 0) {
                if (!alreadyAdded(userId, selectedSupplier, product)) {
                    Orders.update({
                        user: userId,
                        supplier: selectedSupplier,
                        status: 0
                    }, {
                        $push: {
                            orderItems: {
                                $each: [{
                                    product: product,
                                    qty: qty
                                }]
                            }
                        }
                    });

                    console.log('New product '+product+' added to order');
                } else {
                    Orders.update({
                        user: userId,
                        supplier: selectedSupplier,
                        status: 0,
                        'orderItems.product': product
                    }, {
                        $set: {
                            'orderItems.$.qty': qty
                        }
                    });
                   console.log('Product '+product+' updated');
                }
            } else {
                console.log('Quantity is Zero');
            }

        },
        increaseOrder: function(userId, selectedSupplier, qty, product, session) {
            check(userId, String);
            check(selectedSupplier, String);
            check(qty, Number);
            check(product, String);
            check(session, String);
            if (qty > 0) {
                if (!alreadyAdded(userId, selectedSupplier, product)) {
                    Orders.update({
                        user: userId,
                        supplier: selectedSupplier,
                        status: 0
                    }, {
                        $push: {
                            orderItems: {
                                $each: [{
                                    product: product,
                                    qty: qty
                                }]
                            }
                        }
                    });

                    console.log('New product '+product+' added to order');
                } else {
                    Orders.update({
                        user: userId,
                        supplier: selectedSupplier,
                        status: 0,
                        'orderItems.product': product
                    }, {
                        $inc: {
                            'orderItems.$.qty': qty
                        }
                    });
                   console.log('Product '+product+' updated');
                }
            } else {
                console.log('Quantity is Zero');
            }

        },
        decreaseOrder: function(userId, selectedSupplier, qty, product, session) {
            check(userId, String);
            check(selectedSupplier, String);
            check(qty, Number);
            check(product, String);
            check(session, String);
            if (qty < 0) {
                if (!alreadyAdded(userId, selectedSupplier, product)) {
                    Orders.update({
                        user: userId,
                        supplier: selectedSupplier,
                        status: 0
                    }, {
                        $push: {
                            orderItems: {
                                $each: [{
                                    product: product,
                                    qty: qty
                                }]
                            }
                        }
                    });
                } else {    
                    Orders.update({
                        user: userId,
                        supplier: selectedSupplier,
                        status: 0,
                        'orderItems.product': product
                    }, {
                        $inc: {
                            'orderItems.$.qty': qty
                        }
                    });                
                }
            } else {
                console.log('Quantity is Zero');
            }

        },

    // end

    /* addToOrder: function(userId, qty, product, session) {
     console.log(typeof userId);
     check(userId, String);
    // check(supplierId, String);
     check(qty, Number);
     check(product, String);
     check(session, String);
     if (qty > 0) {
         if (!alreadyAdded(product)) {
             Orders.update(
             {
                 user: userId,
                 //supplier: supplierId,
                 status: 0
             }, 
             {
                 $push: {
                     orderItems: {$each: [{product:product, qty:qty}]}
                 }
             });

             console.log('reaching this fn', qty, product, session);
         } 

         else {
             Orders.findAndModify({
                query: {user: userId,
                 //supplier: supplierId,
                 status: 0 },
                 update: 
                 product: product
                }
             }, {
                 qty: qty,
                 product: product,
                 sessid: session
             })
             console.log('Successfully updated');
         }
     } else {
         console.log('Quantity is Zero');
     }

 },*/
    removeOrderItem: function(id, product) {
        check(id, String);
        check(product, String);
        Orders.update({ _id : id }, {$pull : { orderItems : {product:product} } } )
        console.log('successfully deleted');
    }



});

/* this works for orderitems  

function alreadyAdded(product) {
    if (!orderItems.findOne({
            product: product
        })) {
        return false;
    } else {
        return true;
    }
}

*/

function alreadyAdded(userId, selectedSupplier, product) {
    if (!Orders.findOne({ user: userId, supplier:selectedSupplier, orderItems:{ $elemMatch: {product:product}}})) {
        console.log('Prod not already added to order');
        return false;
    } else {
         console.log('Prod IS already added to order');
        return true;
    }
}

function openOrderExists(supplierId) {
    if (Orders.findOne({
            supplier: supplierId,
            status: 0
        })) {
        return true;
    } else {
        return false;
    }

}

