App.Controllers.Popup.extend('App.Controllers.Register', /* @Static */{
}, /* @Prototype */{
    init: function(element, options) {
    },
    doRegister: function(ev) {
        if (ev) ev.preventDefault();
        this.block();
        var registration = $(this.element).jsonFormData();
        App.Models.Registration.register(registration);
    },
    'a.button.login click': function(el, ev) {
        this.doRegister(ev);
    },
    'registration.registered subscribe': function(ev, data) {
        this.close();
        App.Models.Credentials.publish("loggedIn", data);
    },
    'Validation.register subscribe': function(ev, data) {
        this.validationErrors(data);
    }
});