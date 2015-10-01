Suppliers = new Mongo.Collection('suppliers');


Suppliers.allow({
  update: function(userId, supplier) { return ownsDocument(userId, supplier); },
  remove: function(userId, supplier) { return ownsDocument(userId, supplier); },
});

Suppliers.deny({
  update: function(userId, supplier, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'supplierName', 'supplierEmail', 'accountNo').length > 0);
  }
});

Meteor.methods({
  supplierInsert: function(supplierAttributes) {
    check(Meteor.userId(), String);
    check(supplierAttributes, {
      supplierName: String,
      supplierEmail: String,
      accountNo: String
    });

    var errors = validateSupplier(supplierAttributes);
    if (errors.supplierName || errors.supplierEmail || errors.accountNo)
      throw new Meteor.Error('invalid-supplier', "You must set a name, email and account no. for your supplier");


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

Suppliers.deny({
  update: function(userId, supplier, fieldNames, modifier) {
    var errors = validateSupplier(modifier.$set);
    return errors.supplierName || errors.supplierEmail || errors.accountNo;
  }
});

validateSupplier = function (supplier) {
  var errors = {};
  if (!supplier.supplierName)
    errors.supplierName = "Please fill in Supplier Name";
  if (!supplier.supplierEmail)
    errors.supplierEmail =  "Please fill in a valid email";
  if (!supplier.accountNo)
    errors.accountNo =  "Please fill in your account no. for this supplier";
  return errors;
}



