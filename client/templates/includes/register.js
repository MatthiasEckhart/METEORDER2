Template.register.events({
    'submit form': function(event) {
        event.preventDefault();
        // var username = $('[name=username]').val();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            username: username,
            email: email,
            password: password
        }, function(error) {
            if (error) {
                console.log(error.reason); // Output error if registration fails
            } else {
                Router.go("layout"); // Redirect user if registration succeeds
            }
        });
        Router.go('/loggedIn');
    }
});