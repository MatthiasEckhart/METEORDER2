Template.supplierItem.helpers({
  ownSupplier: function() {
    return this.userId === Meteor.userId();
  },
  productsCount: function() {
    return Products.find({supplierId: this._id}).count();
	}
});
