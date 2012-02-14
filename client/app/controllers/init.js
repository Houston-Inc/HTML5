App.Controllers.DIController.extend('App.Controllers.Init', /* @Static */{
}, /* @Prototype */{
    init: function(element, options) {
        console.log("Initializing application...");
        this.element.addClass("loaded").html('views/page/skeleton.ejs', {});
    }
});