Template.order.helpers({
    orderItems: function () {
        return OrderItems.find().map((orderItem) => {
            let product = Products.findOne({
                _id: orderItem.product
            });
            if (product) {
                orderItem.productname = product.description;
                orderItem.price = calcPrice(product, orderItem);
                return orderItem;
            }
        });
    },
    orderCart: function () {
        let orderCart = {subtotal: 0};
        OrderItems.find().forEach((orderItem) => {
            let product = Products.findOne({
                _id: orderItem.product
            });
            if (product) orderCart.subtotal += calcPrice(product, orderItem);
        });
        
        orderCart.tax = orderCart.subtotal * .23;
        orderCart.total = orderCart.subtotal + orderCart.tax;
        return orderCart;
    }
});

function calcPrice(product, orderItem) {
    return (Number(product.price) * orderItem.qty);
}

Template.order.events({
    'click .removeci': function(evt, tmpl) {
        Meteor.call('removeOrderItem', this._id);
    }
});