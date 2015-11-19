Router.configure({
  layoutTemplate: 'layoutHome',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [Meteor.subscribe('suppliers'), Meteor.subscribe('orders') ];
  }
});

/* Router.route('/', {
    name: 'homepage'
  }, function() {
  this.layout('layoutHome');
  this.render('homepage');
  this.render('header', {to: 'header'});
  this.render('footer', {to: 'footer'});
}); */

Router.route('/', {
    name: 'homepage2'
  }, function() {
  this.layout('homepage2');
  
});

Router.route('/loggedin', {
  layoutTemplate: 'layout'
});

/* this half works 
Router.route('/suppliers/:_id', {
  layoutTemplate: 'layout',
  name: 'supplierPage',
  subscriptions: function() {
    return Meteor.subscribe('products', this.params._id);
    return Meteor.subscribe('orders', this.params._id);
  },
  data: function() {
     
        var supplier = Suppliers.findOne(this.params._id);
    if (supplier) {
      return supplier;
    }
  
  var order = Orders.find({status:0});
    if (order) {
      return order;
    }
        
      
      }
});

*/

Router.route('/suppliers/:_id', {
  layoutTemplate: 'layout',
  name: 'supplierPage',
  subscriptions: function() {
    return Meteor.subscribe('products', this.params._id);
    //return Meteor.subscribe('orders', this.params._id);
  },
  data: function() {
     
        var supplier = Suppliers.findOne(this.params._id);
    if (supplier) {
      return supplier;
    }
    
  
  
        
      
      }
});


/* original

Router.route('/suppliers/:_id', {
  layoutTemplate: 'layout',
  name: 'supplierPage',
  waitOn: function() {
    return Meteor.subscribe('products', this.params._id);
  },
  data: function() { return Suppliers.findOne(this.params._id); }
});

*/


Router.route('/suppliers/:_id/edit', {
  layoutTemplate: 'layout',
  name: 'supplierEdit',
  data: function() { return Suppliers.findOne(this.params._id); }
});

Router.route('/createSupplier', {
  layoutTemplate: 'layout',
    name: 'supplierCreate'
  });

Router.route('/register', {
  name: 'register',
  layoutTemplate: 'layoutHome'
});

Router.route('/login', {
  name: 'login',
   layoutTemplate: 'layoutHome'
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