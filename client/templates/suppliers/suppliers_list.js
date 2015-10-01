Template.suppliersList.helpers({
  suppliers: function() {
    return Suppliers.find({}, {sort: {submitted: -1}});
  }
});