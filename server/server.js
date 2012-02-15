var connect = require('connect'),
    quip = require('quip'),
    filter = require('filter'),
    socketio = require('socket.io'),
    REST = require('restapi/rest.js');

var dependency = {
    connect: connect
};

var ALLOWED = {
    onlyIf: function(req) {
        return !!req.session.user;
    },
    always: [
        /^\/out\/.*/,
        /^\/app\/.*/,
        /^\/steal\/.*/,
        /^\/jquery\/.*/,
        /^\/rest\/.*/
    ]
};


var WEBROOT = __dirname + '/../client';
connect(
    connect.logger(),
    connect.cookieParser(),
    connect.session({secret: 'super626'}),
    quip(),
    filter(ALLOWED),
    connect.bodyParser(),
    connect.router(REST.create(dependency)),
    connect.static(WEBROOT)
).listen(80);
console.log("Started static HTTP server at " + WEBROOT);

// socket server
var SOCKET_PORT = 8082;
var io = socketio.listen(SOCKET_PORT);
console.log("WebSocket server listens on port "+SOCKET_PORT);
io.configure('production', function() {
    io.enable('browser client etag');
    io.set('log level', 1);
    io.set('transports', ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);
});
io.configure('development', function() {
    io.set('log level', 1);
});
io.sockets.on('connection', function (socket) {
    socket.emit('event', {event: 'connected'});
    socket.on('clientMessage', function (data) {
        io.sockets.emit('event', {event: 'serverMessage', data: data});
    });
});

console.log("Server startup was successful.");