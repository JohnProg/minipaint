var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);



// app.set('port', process.env.PORT || 3000);
// app.listen(7000);
//var server = app.listen(app.get('port'), function() {
//  debug('Express server listening on port ' + server.address().port);
//});


var http = require('http').Server(app);
var io = require('socket.io')(http);
console.log(123);

http.listen(9500, function(){
    console.log('listening on *:9000');
});

io.on('connection', function(socket){
    socket.on('event_mouse', function(data){
        console.log('message: ' + data);
        io.emit('msg', data);
    });
});
