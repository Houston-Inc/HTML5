App.Controllers.Popup.extend('App.Controllers.Login', /* @Static */{
}, /* @Prototype */{
    init: function(element, options) {
    },
    doLogin: function(ev) {
        if (ev) ev.preventDefault();
        this.block();
        var credentials = $(this.element).jsonFormData();
        App.Models.Credentials.login(credentials);
    },
    'a.button.login click': function(el, ev) {
        this.doLogin();
    },
    'input[name="password"] enter': function(el, ev) {
        this.doLogin();
    },
    'credentials.loggedIn subscribe': function(ev, data) {
        console.log("logged in "+$.toJSON(data));
        this.close();
    },
    'Validation.login subscribe': function(ev, data) {
        this.validationErrors(data);
    },
    'Auth.loggedOut subscribe': function(ev, data) {
        $("input", this.element).val("");
    }
});