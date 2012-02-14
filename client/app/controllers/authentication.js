App.Controllers.DIController.extend('App.Controllers.Authentication', /* @Static */{
    pluginName: "authentication"
}, /* @Prototype */{
    user: undefined,
    'userLoggedIn subscribe': function(user) {
        this.user = user;
    },
    currentUser: function() {
        return this.user;
    },
    loggedIn: function() {
        return this.user !== undefined;
    },
    checkAuthentication: function() {
        var self = this;
        $.get(CONFIG.rest.url+"/currentUser", function(user) {
            self.publish("isLoggedIn", user);
        }).statusCode({
            404:function (res) {
                self.publish("isLoggedOut");
            }
        });
    }
});