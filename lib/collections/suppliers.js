Suppliers = new Mongo.Collection('suppliers');

Suppliers.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  }
});