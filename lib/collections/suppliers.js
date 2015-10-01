Suppliers = new Mongo.Collection('suppliers');

Meteor.methods({
  supplierInsert: function(supplierAttributes) {
    check(Meteor.userId(), String);
    check(supplierAttributes, {
      supplierName: String,
      supplierEmail: String,
      accountNo: String
    });
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