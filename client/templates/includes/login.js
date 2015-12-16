Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();

        Meteor.loginWithPassword(email, password, function(error) {
            if (error) {
                return throwError(error.reason);
            } else {
                var userId = Meteor.userId();
                var supplier = Suppliers.findOne({
                    userId: userId
                });
                var supplierId = supplier._id;
                Session.set('selectedSupplier', supplierId);
                var selectedSupplier = Session.get('selectedSupplier');
                Router.go('supplierPage', {
                    _id: selectedSupplier
                });
            }
        });
    }
});


/* Original

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error){
    if(error){
        return throwError(error.reason);
    } else {
        Router.go("/loggedin");
    }
});
    }
}); */