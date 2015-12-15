//TW BL 2015 11 12
Template.order.helpers({
    currentOrder: function() {
        var userId = Meteor.userId();
        var selectedSupplier = Session.get('selectedSupplier');
        var order = Orders.findOne({
            supplier: selectedSupplier,
            status: 0
        });
        // console.log('hello ' + currentOrder.orderItems.product[0]); // this returns [object object] ...why???
        // return supplier;
        var currentOrder = order.orderItems;
        console.log(JSON.stringify(currentOrder));
        currentOrder.forEach(function(orderItem) {
            let product = Products.findOne({
                _id: orderItem.product
            });
            if (product) {
                orderItem.productname = product.description;
                orderItem.price = calcPrice(product, orderItem);
                console.log('product: ' + orderItem.productname);
                return orderItem;
            } else {
                console.log('Nope');
            }
        });
        console.log('me too' + JSON.stringify(currentOrder));
        return currentOrder;
    },
    orderCart: function() {
        let orderCart = {
            subtotal: 0
        };
        var selectedSupplier = Session.get('selectedSupplier');
        var order = Orders.findOne({
            supplier: selectedSupplier,
            status: 0
        });
        var currentOrder = order.orderItems;
        console.log(JSON.stringify(currentOrder));
        currentOrder.forEach(function(orderItem) {
            let product = Products.findOne({
                _id: orderItem.product
            });
            if (product) orderCart.subtotal += calcPrice(product, orderItem);
        });

        orderCart.tax = orderCart.subtotal * .23;
        orderCart.total = orderCart.subtotal + orderCart.tax;
        return orderCart;
    },
    orderNumber: function() {
        var selectedSupplier = Session.get('selectedSupplier');
        var order = Orders.findOne({
            supplier: selectedSupplier,
            status: 0
        });
        var orderNumber = order.orderNumber;
        return orderNumber;
    },
    request: function() {
        var selectedSupplier = Session.get('selectedSupplier');
        var order = Orders.findOne({
            supplier: selectedSupplier,
            status: 0
        });

        var request = order.request;
        if (request) {
            return request;
        } else {
            return null;
        }
    },
    supplier: function() {
        var selectedSupplier = Session.get('selectedSupplier');
        var newOrder = Orders.findOne({
            supplier: selectedSupplier,
            status: 0
        });
        if (newOrder.supplier) {
            var supplier = Suppliers.findOne({
                _id: newOrder.supplier
            });
            console.log('supplier: ' + supplier.supplierName);
        } else {
            console.log('supplier dont exist');
        }

        supplier = supplier.supplierName;
        return supplier;
    }

});

function calcPrice(product, orderItem) {
    return (Number(product.price) * orderItem.qty);
}

Template.order.events({
    'click .removeci': function(evt, tmpl) {
        evt.preventDefault();
        var selectedSupplier = Session.get('selectedSupplier');
        var order = Orders.findOne({
            supplier: selectedSupplier,
            status: 0
        });
        var orderId = order._id;
        var product = this.product;

        Meteor.call('removeOrderItem', orderId, product);
    },
    'change #specialRequests': function(evt, tmpl) {
        evt.preventDefault();
        var selectedSupplier = Session.get('selectedSupplier');
        var order = Orders.findOne({
            supplier: selectedSupplier,
            status: 0
        });
        var orderId = order._id;

        var request = evt.target.value;
        Meteor.call('addSpecialRequest', orderId, request);
    },
    'click .order-submit': function(evt, tmpl) {
        //evt.preventDefault();
        var userId = Meteor.userId();
        var selectedSupplier = Session.get('selectedSupplier');
        var order = Orders.findOne({
            supplier: selectedSupplier,
            status: 0
        });
        var orderId = order._id;

        var supplierDetails = Suppliers.findOne({
            _id: selectedSupplier
        });
        var supplierEmail = supplierDetails.supplierEmail;

        $('.ui.basic.test.modal')
            .modal({
                closable: false,
                onDeny: function() {

                },
                onApprove: function() {
                    console.log('order submitted');
                    Meteor.call('submitOrder', orderId);
                    Meteor.call('sendOrderEmail',
                        supplierEmail,
                        'brian@properorder.ie',
                        'Hello!',
                        'This is the order youve been looking for');
                    Meteor.call('createOrder', userId, supplierId);
                }
            })
            .modal('setting', 'transition', 'fade')
            .modal('show');
    }

});

var supplierId = this._id;
Session.set('selectedSupplier', supplierId);
var selectedSupplier = Session.get('selectedSupplier');