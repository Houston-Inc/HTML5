$.Controller.extend('App.Controllers.Socket',/* @Static */{
},/* @Prototype */{
    init: function(element, options) {
        var self = this;
        var socket = io.connect('http://'+document.location.host+':'+CONFIG.socket.port);
        socket.on('event', function (data) {
            if (self[data.event]) {
                self[data.event](data);
            }
            else {
                OpenAjax.hub.publish(data.event, data);
            }
        });
    },
    'connected subscribe': function(data) {
        console.log("Socket connected");
    }
});