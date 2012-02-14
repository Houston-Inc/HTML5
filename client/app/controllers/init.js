App.Controllers.DIController.extend('App.Controllers.Init', /* @Static */{
}, /* @Prototype */{
    init: function(element, options) {
        console.log("Initializing application...");
    },
    'connected subscribe': function(data) {
        this.element.addClass("loaded").html('views/page/skeleton.ejs', {});
    }
});