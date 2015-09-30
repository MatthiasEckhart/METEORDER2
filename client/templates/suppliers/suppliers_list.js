var suppliersData = [
  {
    supplierName: 'LaRousse',
    accountNo: 'FOR123'
  }, 
  {
    supplierName: 'Cloud Chain',
    accountNo: 'FA0001'
  }, 
  {
    supplierName: 'Garagiste',
    accountNo: 'ForAve2'
  }
];
Template.suppliersList.helpers({
  suppliers: suppliersData
});