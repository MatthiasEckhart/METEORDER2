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
