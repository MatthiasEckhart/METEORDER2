Suppliers = new Mongo.Collection('suppliers');


Suppliers.allow({
  update: function(userId, supplier) { return ownsDocument(userId, supplier); },
  remove: function(userId, supplier) { return ownsDocument(userId, supplier); },
});

Meteor.methods({
  supplierInsert: function(supplierAttributes) {
    check(Meteor.userId(), String);
    check(supplierAttributes, {
      supplierName: String,
      supplierEmail: String,
      accountNo: String
    });

    var supplierDuplicates = Suppliers.findOne({supplierName: supplierAttributes.supplierName});
    if (supplierDuplicates) {
      return {
        supplierExists: true,
        _id: supplierDuplicates._id
      }
    }

    var user = Meteor.user();
    var supplier = _.extend(supplierAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date()
    });
    var supplierId = Suppliers.insert(supplier);
    return {
      _id: supplierId
    };
  }
});