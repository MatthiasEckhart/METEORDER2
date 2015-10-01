Template.supplierItem.helpers({
  ownSupplier: function() {
    return this.userId === Meteor.userId();
  }
});
