//Test version BL 2015 11 12
Template.order.helpers({

    currentOrder: function(){
        var selectedSupplier = Session.get('selectedSupplier');
         return Orders.find({supplier: selectedSupplier});
         
    }
});


/*new version BJL 2015 11 10

Template.order.helpers({
    orderItems: function () {
        debugger;
      var userId = Meteor.userId();
      console.log(userId);
      var selectedSupplier = Session.get('selectedSupplier');
      console.log(selectedSupplier);
        return Orders.findOne({user:userId, supplier: selectedSupplier, status:0},{orderItems:1}).map((orderItem) => {
            let product = Products.findOne({
                _id: orderItem.orderItems.product
            });
            if (product) {
                orderItem.productname = product.description;
                console.log(orderItem.productname);
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

/*original version

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

*/