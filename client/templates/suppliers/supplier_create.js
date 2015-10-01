Template.supplierCreate.onCreated(function() {
  Session.set('supplierCreateErrors', {});
});
Template.supplierCreate.helpers({
  errorMessage: function(field) {
    return Session.get('supplierCreateErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('supplierCreateErrors')[field] ? 'has-error' : '';
  }
});

Template.supplierCreate.events({
  'submit form': function(e) {
    e.preventDefault();

    var supplier = {
      supplierName: $(e.target).find('[name=supplierName]').val(),
      supplierEmail: $(e.target).find('[name=supplierEmail]').val(),
      accountNo: $(e.target).find('[name=accountNo]').val()
    };

    var errors = validateSupplier(supplier);
    if (errors.supplierName || errors.supplierEmail || errors.accountNo)
      return Session.set('supplierCreateErrors', errors);


    Meteor.call('supplierInsert', supplier, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);

      // show this result but route anyway
      if (result.supplierExists)
        return throwError('This supplier already exists.');

      Router.go('supplierPage', {_id: result._id});  
    });

  }
});