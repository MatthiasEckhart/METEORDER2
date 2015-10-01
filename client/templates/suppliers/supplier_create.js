Template.supplierCreate.events({
  'submit form': function(e) {
    e.preventDefault();

    var supplier = {
      supplierName: $(e.target).find('[name=supplierName]').val(),
      supplierEmail: $(e.target).find('[name=supplierEmail]').val(),
      accountNo: $(e.target).find('[name=accountNo]').val()
    };

    Meteor.call('supplierInsert', supplier, function(error, result) {
      // display the error to the user and abort
      if (error)
        return alert(error.reason);
      Router.go('supplierPage', {_id: result._id});  
    });

    supplier._id = Suppliers.insert(supplier);
    Router.go('supplierPage', supplier);
  }
});