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

var requireLogin = function() {
  if (! Meteor.user()) {
  	if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.route('/createSupplier', {name: 'supplierCreate'});

Router.onBeforeAction('dataNotFound', {only: 'supplierPage'});
Router.onBeforeAction(requireLogin, {only: 'supplierCreate'});