Template.supplierPage.helpers({
  comments: function() {
    return Products.find({supplierId: this._id});
  }
});