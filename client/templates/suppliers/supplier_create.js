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

      // show this result but route anyway
      if (result.supplierExists)
        alert('This supplier already exists.');

      Router.go('supplierPage', {_id: result._id});  
    });

  }
});