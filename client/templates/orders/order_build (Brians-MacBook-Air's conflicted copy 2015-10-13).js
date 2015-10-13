Template.order.orderItems = function(){};
Template.order.helpers({
    'orderitems':function(){
        var orderCart = [];
        var orderItems = OrderItems.find({});
        var total = 0;

    orderItems.forEach(function(orderItem){
        var item = _.extend(orderItem,{});
        var product = Products.findOne({_id:orderItem.product});
        orderItem.productname = product.name;
        console.log(orderItem.productname);
        orderItem.price = (Number(product.price) * orderItem.qty);
        total += orderItem.price;
        orderCart.push(orderItem);
    });
    orderCart.subtotal = total;
    orderCart.tax = orderCart.subtotal * .06;
    orderCart.total = orderCart.subtotal + orderCart.tax;
    return orderCart; 
    }
})

Template.order.events({
    'click .removeci':function(evt,tmpl){
        Meteor.call('removeOrderItem',this._id);
    }
});