Template.productCreate.onCreated(function() {
  Session.set('productCreateErrors', {});
});

Template.productCreate.helpers({
  errorMessage: function(field) {
    return Session.get('productCreateErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('productCreateErrors')[field] ? 'has-error' : '';
  }
});

Template.productCreate.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $sku = $(e.target).find('[name=sku]');
    var $description = $(e.target).find('[name=description]');
    var $unit = $(e.target).find('[name=unit]');
    var $price = $(e.target).find('[name=price]');
    var product = {
      sku: $sku.val(),
      description: $description.val(),
      unit: $unit.val(),
      price: $price.val(),
      supplierId: template.data._id
    };

    var errors = {};
    if (! product.sku) {
      errors.sku = "Please enter SKU";
      return Session.set('productCreateErrors', errors);
    }

    Meteor.call('productCreate', product, function(error, productId) {
      if (error){
        throwError(error.reason);
      } else {
        $sku.val('');
      }
    });
  }
});
