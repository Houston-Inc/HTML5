var connect = require('connect'),
    quip = require('quip'),
    filter = require('filter'),
    mongo = require('mongoskin'),
    socketio = require('socket.io'),
    securityREST = require('restapi/security.js');
    usersREST = require('restapi/users.js');

var dependency = {
    connect: connect,
    db: mongo.db('localhost/app')
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
        /^\/login/,
        /^\/currentUser/,
        /^\/logout/,
        /^\/register/,
        /^\/activate/,
        /^\/forgotPassword/
    ]
};


var WEBROOT = __dirname + '/../client';
connect(
    connect.logger(),
    connect.cookieParser(),
    connect.session({ secret: 'super626' }),
    quip(),
    filter(ALLOWED),
    connect.bodyParser(),
    connect.router(securityREST.create(dependency)),
    connect.router(usersREST.create(dependency)),
    connect.static(WEBROOT)
).listen(80);
console.log("Started static HTTP server at " + WEBROOT);

// socket server
var SOCKET_PORT = 8081;
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
    socket.emit('event', {event: 'connected' });
});

console.log("Server startup was successful.");