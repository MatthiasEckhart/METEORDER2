Template.productEdit.onCreated(function() {
  Session.set('productEditErrors', {});
});
Template.productEdit.helpers({
  errorMessage: function(field) {
    return Session.get('productEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('productEditErrors')[field] ? 'has-error' : '';
  }
});

Template.productEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentProductId = this._id;

    var productProperties = {
      sku: $(e.target).find('[name=sku]').val(),
      description : $(e.target).find('[name=description]').val(),
      category : $(e.target).find('[name=category]').val(),
      unit : $(e.target).find('[name=unit]').val(),
      price : $(e.target).find('[name=price]').val()   
    }

    var errors = validateProduct(productProperties);
    if (errors.sku || errors.description || errors.category || errors.unit || errors.price)
      return Session.set('productEditErrors', errors);

    Products.update(currentProductId, {$set: productProperties}, function(error) {
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

    if (confirm("Delete this product?")) {
      var currentProductId = this._id;
      Products.remove(currentProductId);
      Suppliers.update(product.supplierId, {$inc: {productsCount: -1}});
      Router.go('suppliersList');
    }
  }});


















