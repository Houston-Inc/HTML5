App.Controllers.DIController.extend('App.Controllers.Init', /* @Static */{
}, /* @Prototype */{
    authentication: inject,
    init: function(element, options) {
        console.log("Initializing application...");
        this.authentication.checkAuthentication();
    },
    'isLoggedIn subscribe': function(data) {
        this.element.addClass("loaded loggedIn");
        this.element.html('views/page/skeleton.ejs', {});
    },
    'isLoggedOut subscribe': function() {
        this.element.addClass("loaded loggedOut");
        this.element.html('views/page/skeleton.ejs', {});
    }
});