$.Controller.extend('App.Controllers.Navigation', /* @Static */{
}, /* @Prototype */{
    init: function(element, options) {
        $(element).html('//app/views/navi/navi.ejs', options);
    }
});