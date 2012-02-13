$.Model.extend('App.Models.Credentials',{
     login: function(credentials){
         $.post(CONFIG.rest.url+"/login", credentials, function(data) {
            App.Models.Credentials.publish("loggedIn", data);
         }, "json");
     },
     logout: function(credentials){
         $.get(CONFIG.rest.url+"/logout", "", function(data) {
            App.Models.Credentials.publish("loggedOut", data);
         }, "json");
     }
}, {});