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
    orderCart: function () {
        let orderCart = {subtotal: 0};

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
    supplier: function(){
        var selectedSupplier = Session.get('selectedSupplier');
         var newOrder = Orders.findOne({supplier: selectedSupplier, status:0});
         if (newOrder.supplier){
            var supplier = Suppliers.findOne({
                _id: newOrder.supplier
            });
            console.log('supplier: '+ supplier.supplierName );
         } else{
              console.log('supplier dont exist' );
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
         var selectedSupplier = Session.get('selectedSupplier');
     var order = Orders.findOne({
         supplier: selectedSupplier,
         status: 0
     });
     var orderId = order._id;
     var product = this.product;
      
        Meteor.call('removeOrderItem', orderId, product);
    }
});

 var supplierId = this._id;
            Session.set('selectedSupplier', supplierId);
             var selectedSupplier = Session.get('selectedSupplier');
/* this dont work ...yet
Template.order.helpers({

    currentOrder: function(){
        var userId = Meteor.userId();
        var selectedSupplier = Session.get('selectedSupplier');
        var currentOrder = Orders.find({supplier: selectedSupplier, status:0});
 
 var count = 0;
currentOrder.forEach(function (post) {
  console.log("Title of post " + count + ": " + post.orderItems.product[count]);
  count += 1;
});

        // console.log('hello ' + currentOrder.orderItems.product[0]); // this returns [object object] ...why???
         return currentOrder;



         this.currentOrder.map((orderItem) => {
            console.log(orderItem.product);
         });

    }
}); */

/*new version BJL 2015 11 10

Template.order.helpers({
    orderItems: function () {
        //debugger;
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
*/
/*original version

Template.order.helpers({
    borderItems: function () {
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
}); */



//*/