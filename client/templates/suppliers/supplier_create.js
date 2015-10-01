Template.supplierCreate.events({
  'submit form': function(e) {
    e.preventDefault();

    var supplier = {
      supplierName: $(e.target).find('[name=supplierName]').val(),
      supplierEmail: $(e.target).find('[name=supplierEmail]').val(),
      accountNo: $(e.target).find('[name=accountNo]').val()
    };

    supplier._id = Suppliers.insert(supplier);
    Router.go('supplierPage', supplier);
  }
});