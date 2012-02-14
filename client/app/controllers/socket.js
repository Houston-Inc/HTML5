App.Controllers.DIController.extend('App.Controllers.Socket',/* @Static */{
    pluginName: "communication"
},/* @Prototype */{
    socket: undefined,
    init: function(element, options) {
        var self = this;
        this.socket = io.connect('http://'+document.location.host+':'+CONFIG.socket.port);
        this.socket.on('event', function (data) {
            self.publish(data.event, data.data);
        });
    },
    getSocket: function() {
        return this.socket;
    },
    'connected subscribe': function(data) {
        console.log("Socket connected", data);
    }
});