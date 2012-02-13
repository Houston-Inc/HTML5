$.Controller.extend('App.Controllers.ViewPort', /* @Static */{
}, /* @Prototype */{
    init: function(element, options) {
        $(element).html('//app/views/page/viewport.ejs',{loggedIn: true});
    }
});