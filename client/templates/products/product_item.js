Template.productItem.helpers({
  submittedText: function() {
    return this.submitted.toString();
  }
});

Template.productItem.events({
    'click .addOrder':function(evt,tmpl){
        var qty = tmpl.find('.prodqty').value;
        var product = this._id;
        var sessid = Meteor.default_connection._lastSessionId; //stops others  adding to your cart etc
         console.log(sessid, qty, product);//stops others  ad
        Meteor.call('addToOrder',qty,product,sessid);
    }
});