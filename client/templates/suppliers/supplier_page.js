Template.supplierPage.helpers({
  products: function() {
    return Products.find({supplierId: this._id});
  }
});