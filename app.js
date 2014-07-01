#!/usr/bin/env node

var debug = require('debug')('myapp');



var express = require('express');


var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.set('port', process.env.PORT || 3000);

//var server = app.listen(app.get('port'), function() {
//  debug('Express server listening on port ' + server.address().port);
//});


var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendfile('index.html');
});


http.listen(3000, function(){
    console.log('listening on *:3000');
});

io.on('connection', function(socket){
    console.log(543);
    socket.on('event_mouse', function(data){
        console.log('message: ' + data);
        io.emit('msg', data);
    });
});

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
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


//var io = require('socket.io').listen(app);
//
////var server = http.createServer(app);
//var server = http.createServer(app).listen(app.get('port'), function(){
//    console.log('Express server listening on port ' + app.get('port'));
//});
//
//var io = require('socket.io').listen(app);
//
//
//var io = require('socket.io').listen(server);
////require('./io')(io);
//io.sockets.on('connection', function(socket){
//    console.log(65);
//});