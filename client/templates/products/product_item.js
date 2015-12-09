Template.productItem.helpers({
  submittedText: function() {
    return this.submitted.toString();
  }/* ,
  currentQty: function() {
        var userId = Meteor.userId();
        var selectedSupplier = Session.get('selectedSupplier');
        var order = Orders.findOne({
            supplier: selectedSupplier,
            status: 0
        });
        // console.log('hello ' + currentOrder.orderItems.product[0]); // this returns [object object] ...why???
        // return supplier;

        var currentQty = order.qty;
        return currentQty;

    }*/
});

Template.productItem.events({
    'click .addOrder':function(evt,tmpl){
      var userId = Meteor.userId();
      var selectedSupplier = Session.get('selectedSupplier');
      var qty1 = this.unit;
      var qty = parseInt(qty1);
        var product = this._id;
        var sessid = Meteor.default_connection._lastSessionId; //stops others  adding to your cart etc
         console.log('this is the quantity:', typeof qty, product, sessid);
        Meteor.call('increaseOrder',userId, selectedSupplier, qty, product, sessid);
    },
     'click .lessOrder':function(evt,tmpl){
      var userId = Meteor.userId();
      var selectedSupplier = Session.get('selectedSupplier');
      var qty1 = this.unit;
      var qty =- parseInt(qty1);
        var product = this._id;
        var sessid = Meteor.default_connection._lastSessionId; //stops others  adding to your cart etc
         console.log('this is the quantity:', qty, product, sessid);
        Meteor.call('decreaseOrder',userId, selectedSupplier, qty, product, sessid);
    },
    'keyup .productInput': function (evt,tmpl) {
      console.log("value", evt.target.value);
      var userId = Meteor.userId();
      var selectedSupplier = Session.get('selectedSupplier');
      var qty1 = evt.target.value;
      console.log('qty1: '+qty1);
      var qty = parseInt(qty1);
      var product = this._id;
      var sessid = Meteor.default_connection._lastSessionId; //stops others  adding to your cart etc
      Meteor.call('addToOrder',userId, selectedSupplier, qty, product, sessid);

    }
});

