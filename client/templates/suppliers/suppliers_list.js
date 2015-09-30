Template.suppliersList.helpers({
  suppliers: function() {
    return Suppliers.find();
  }
});