Template.supplierEdit.onCreated(function() {
  Session.set('supplierEditErrors', {});
});
Template.supplierEdit.helpers({
  errorMessage: function(field) {
    return Session.get('supplierEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('supplierEditErrors')[field] ? 'has-error' : '';
  }
});

Template.supplierEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentSupplierId = this._id;

    var supplierProperties = {
      supplierName: $(e.target).find('[name=supplierName]').val(),
      supplierEmail: $(e.target).find('[name=supplierEmail]').val(),
      accountNo: $(e.target).find('[name=accountNo]').val()
    }

    var errors = validateSupplier(supplierProperties);
    if (errors.supplierName || errors.supplierEmail || errors.accountNo)
      return Session.set('postEditErrors', errors);

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