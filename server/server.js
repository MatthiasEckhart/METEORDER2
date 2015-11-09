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

    // end

    addToOrder: function(qty, product, session) {
        console.log('Im here!');
        check(qty, Number);
        check(product, String);
        check(session, String);
        if (qty > 0) {
            if (!alreadyAdded(product)) {
                OrderItems.insert({
                    qty: qty,
                    product: product,
                    sessid: session
                });
                console.log('reaching this fn', qty, product, session);
            } else {
                OrderItems.update({
                    product: product
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

    },
    removeOrderItem: function(id) {
        check(id, String);
        OrderItems.remove({
            _id: id
        });
        console.log('successfully deleted');
    }



});

function alreadyAdded(product) {
    if (!OrderItems.findOne({
            product: product
        })) {
        return false;
    } else {
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