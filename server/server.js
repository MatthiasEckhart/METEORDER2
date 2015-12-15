Meteor.methods({
    createOrder: function(userId, supplierId) {
        check(supplierId, String);
        check(userId, String);

        var user = Meteor.users.findOne({
            _id: userId
        });
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
    addToOrder: function(userId, selectedSupplier, qty, product, session) {
        check(userId, String);
        check(selectedSupplier, String);
        check(qty, Number);
        check(product, String);
        check(session, String);
        if (qty >= 0) {
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

                console.log('New product ' + product + ' added to order');
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
                console.log('Product ' + product + ' updated');
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

                console.log('New product ' + product + ' added to order');
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
                console.log('Product ' + product + ' updated');
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
    removeOrderItem: function(id, product) {
        check(id, String);
        check(product, String);
        Orders.update({_id: id}, {$pull: {orderItems: {product: product}}});
       console.log('successfully deleted');
    },
    addSpecialRequest: function(orderId, request) {
        check(orderId, String);
        check(request, String);
        Orders.update({
            _id: orderId
        }, {
            $set: {
                _id: orderId,
                request: request
            }
        });
        console.log('Request successfully added');
    },
    createOrderNumber: function(userId) {
        check(userId, String);
        OrderNumbers.insert({
            user: userId,
            currentOrder: 100000
        });
    },
    submitOrder: function(orderId) {
        check(orderId, String);
        Orders.update({
            _id: orderId
        }, {
            $set: {
                _id: orderId,
                status: 1
            }
        });
        console.log('submitted' + orderId);
    },
    sendOrderEmail: function(to, from, subject, text) {
        check([to, from, subject, text], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        Email.send({
            to: to,
            from: from,
            subject: subject,
            text: text
        });
    }
    });

function alreadyAdded(userId, selectedSupplier, product) {
    if (!Orders.findOne({
            user: userId,
            supplier: selectedSupplier,
            status: 0,
            orderItems: {
                $elemMatch: {
                    product: product
                }
            }
        })) {
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

