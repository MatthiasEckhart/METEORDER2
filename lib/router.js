Router.configure({
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('suppliers');
  }
});

Router.route('/', function() {
  this.layout('layoutHome');
  this.render('homepage');
  this.render('header', {to: 'header'});
  this.render('footer', {to: 'footer'});
})

Router.route('/loggedin', function() {
  this.layout('layout');
  this.render('');
  this.render('header', {to: 'header'});
  this.render('footer', {to: 'footer'});
});

Router.route('/suppliers/:_id', {
  layoutTemplate: 'layout',
  name: 'supplierPage',
  waitOn: function() {
    return Meteor.subscribe('products', this.params._id);
  },
  data: function() { return Suppliers.findOne(this.params._id); }
});

Router.route('/suppliers/:_id/edit', {
  layoutTemplate: 'layout',
  name: 'supplierEdit',
  data: function() { return Suppliers.findOne(this.params._id); }
});

Router.route('/createSupplier', {
  layoutTemplate: 'layout',
    name: 'supplierCreate'
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

Router.onBeforeAction('loading');
Router.onBeforeAction('dataNotFound', {only: 'supplierPage'});
Router.onBeforeAction(requireLogin, {only: 'supplierCreate'});