Template.order.orderItems = function(){
   
};
Template.order.helpers({
    'orderItems':function(){
        var orderItem = [];
        var orderItems = OrderItems.find({});
        var total = 0;

    orderItems.forEach(function(orderItem){
        var item = _.extend(orderItem,{});
        var product = Products.findOne({_id:orderItem.product});
        orderItem.productname = product.name;
        orderItem.price = (Number(product.price) * orderItem.qty);
        total += orderItem.price;
        orderItem.push(orderItem);
    });
    orderItem.subtotal = total;
    orderItem.tax = orderItem.subtotal * .06;
    orderItem.total = orderItem.subtotal + orderItem.tax;
    return orderItem; 
    }
})

Template.order.events({
    'click .removeci':function(evt,tmpl){
        Meteor.call('removeOrderItem',this._id);
    }
});