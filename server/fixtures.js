 // Fixture data
if (Suppliers.find().count() === 0) {
  var now = new Date().getTime();

  // create two users
  var brianId = Meteor.users.insert({
    profile: { name: 'Forest Avenue' }
  });
  var brian = Meteor.users.findOne(brianId);
  var cliveId = Meteor.users.insert({
    profile: { name: 'Colombe dOr' }
  });
  var clive = Meteor.users.findOne(cliveId);

  var garagisteId = Suppliers.insert({
    supplierName: 'Garagiste',
    userId: brian._id,
    creator: brian.profile.name,
    supplierEmail: 'sales@garagiste.ie',
    accountNo: 'FA1234',
    submitted: new Date(now - 7 * 3600 * 1000),
    productsCount: 2
  });

  Products.insert({
    supplierId: garagisteId,
    userId: brian._id,
    creator: brian.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    sku: 'Gar001',
    description: 'Sauvignon Blanc 2012',
    unit: '12',
    price: '9.95'
  });

  Products.insert({
    supplierId: garagisteId,
    userId: clive._id,
    creator: clive.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    sku: 'Gar002',
    description: 'Pinot Grigio 2012',
    unit: '6',
    price: '10.95'
  });

  Suppliers.insert({
    supplierName: 'Cloud Chain',
    userId: brian._id,
    creator: brian.profile.name,
    supplierEmail: 'sales@cloudchain.ie',
    accountNo: 'FA6789',
    submitted: new Date(now - 9 * 3600 * 1000),
    productsCount: 0
  });

  Suppliers.insert({
    supplierName: 'La Rousse',
    userId: clive._id,
    creator: clive.profile.name,
    supplierEmail: 'sales@larousse.ie',
    accountNo: 'FA9000',
    submitted: new Date(now - 6 * 3600 * 1000),
    productsCount: 0
  });
}