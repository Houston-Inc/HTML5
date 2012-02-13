$.Model.extend('App.Models.Registration',{
     register: function(registration){
         $.post(CONFIG.rest.url+"/register", registration, function(data) {
            App.Models.Registration.publish("registered", data);
         }, "json")
     }
}, {});