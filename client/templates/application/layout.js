Template.layout.events({
    'click .supplier-sidebar-show': function() {
        console.log('button pressed');
       $('.ui.sidebar').sidebar('setting', { dimPage: false });
        $('.ui.sidebar').sidebar('toggle');
	}
});

