Template.supplierItem.onRendered(function(){
   var userId = Meteor.userId();
            var supplier = Suppliers.findOne({userId:userId});
            var supplierId = supplier._id;
            Session.set('selectedSupplier', supplierId);
            var selectedSupplier = Session.get('selectedSupplier');
      if (supplierId == selectedSupplier) {
         console.log('A match boyo');
          return "selected"
      }else{
        console.log('no match boyo');
      }

});

Template.supplierItem.helpers({
  ownSupplier: function() {
    return this.userId === Meteor.userId();
  },
	'selectedClass': function() {
	    var supplierId = this._id;
	    var selectedSupplier = Session.get('selectedSupplier');
	    if (supplierId == selectedSupplier) {
	        return "selected"
	    }
	}
});

Template.supplierItem.events({
'click .supplier': function() {
            var userId = Meteor.userId();
            var supplierId = this._id;
            Session.set('selectedSupplier', supplierId);
             var selectedSupplier = Session.get('selectedSupplier');
            console.log(selectedSupplier);
            Meteor.call('createOrder',userId, supplierId);
        }
    });