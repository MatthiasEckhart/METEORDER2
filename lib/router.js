Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('suppliers'); }
});

Router.route('/', {name: 'suppliersList'});
Router.route('/suppliers/:_id', {
  name: 'supplierPage',
  data: function() { return Suppliers.findOne(this.params._id); }
});

Router.route('/createSupplier', {name: 'supplierCreate'});

Router.onBeforeAction('dataNotFound', {only: 'supplierPage'});