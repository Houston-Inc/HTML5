$.Controller.extend('App.Controllers.Init', /* @Static */{
}, /* @Prototype */{
    init: function(element, options) {
        console.log("Initializing application...");
        $(element).app_socket();
        $.get(CONFIG.rest.url+"/currentUser", function(user) {
            $("body").html('//app/views/page/skeleton.ejs',{loggedIn: true}).addClass("loaded");
        }).statusCode({
            404: function(res) {
                $("body").html('//app/views/page/skeleton.ejs',{loggedIn: false}).addClass("loaded");
            }
        });
    }
});