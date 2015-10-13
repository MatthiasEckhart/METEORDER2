Template.productItem.helpers({
  submittedText: function() {
    return this.submitted.toString();
  }
});

Template.productItem.events({
    'click .addOrder':function(evt,tmpl){
      var qty1 = tmpl.find('.prodqty').value;
      var qty = parseInt(qty1);
        var product = this._id;
        var sessid = Meteor.default_connection._lastSessionId; //stops others  adding to your cart etc
         console.log('this is the quantity:', typeof qty, product, sessid);//stops others  ad
        Meteor.call('addToOrder',qty, product, sessid);
    }
});