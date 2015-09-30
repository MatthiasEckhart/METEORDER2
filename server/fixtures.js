if (Suppliers.find().count() === 0) {
  Suppliers.insert({
    supplierName: 'LaRousse',
    accountNo: 'FOR123'
  });

  Suppliers.insert({
    supplierName: 'Garagiste',
    accountNo: 'FA01234'
  });

  Suppliers.insert({
    supplierName: 'Cloud Chain',
    accountNo: 'ForAve12'
  });

  Suppliers.insert({
    supplierName: 'Cordobar',
    accountNo: 'ForAveMe'
  });

  Suppliers.insert({
    supplierName: 'Vinos Tito',
    accountNo: 'FA7890'
  });
}