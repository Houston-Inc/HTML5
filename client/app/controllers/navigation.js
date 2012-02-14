App.Controllers.DIController.extend('App.Controllers.Navigation', /* @Static */{
}, /* @Prototype */{
    authentication: function() {/* Dependency Injection*/},
    init: function(element, options) {
        this.view("navi/navi.ejs", options);
    }
});