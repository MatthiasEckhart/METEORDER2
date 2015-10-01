Template.supplierEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentSupplierId = this._id;

    var supplierProperties = {
      supplierName: $(e.target).find('[name=supplierName]').val(),
      supplierEmail: $(e.target).find('[name=supplierEmail]').val(),
      accountNo: $(e.target).find('[name=accountNo]').val()
    }

    Suppliers.update(currentSupplierId, {$set: supplierProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('supplierPage', {_id: currentSupplierId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this supplier?")) {
      var currentSupplierId = this._id;
      Suppliers.remove(currentSupplierId);
      Router.go('suppliersList');
    }
  }
});