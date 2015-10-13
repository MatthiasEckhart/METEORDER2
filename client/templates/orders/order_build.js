//Template.order.orderItems = function(){};
Template.order.helpers({
    'orderitems': function() {
        var orderCart = [];
        console.log('hello');
        var orderItems = OrderItems.find({});
        console.log(orderItems);
        var total = 0;
        console.log(total);

        orderItems.forEach(function(orderItem) {
            console.log('made it into loop');
            var item = _.extend(orderItem, {});
            var product = Products.findOne({
                _id: orderItem.product
            });
            orderItem.productname = product.description;
            orderItem.price = (Number(product.price) * orderItem.qty);
            console.log('hello man');
            total += orderItem.price;
            orderCart.push(orderItem);
        });
        console.log(typeof total, total, 'yo');
        orderCart.subtotal = 25;
        orderCart.tax = orderCart.subtotal * .23;
        orderCart.total = orderCart.subtotal + orderCart.tax;
        return orderCart;
    }
})

Template.order.events({
    'click .removeci': function(evt, tmpl) {
        Meteor.call('removeOrderItem', this._id);
    }
});