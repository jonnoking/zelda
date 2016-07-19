var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config.js');
var mongoose = require('mongoose');
var request = require('request');
var jwt = require('express-jwt');


var jwtCheck = jwt({
  secret: new Buffer(config.auth0.secret, 'base64'),
  audience: config.auth0.audience
});

if (process.env.NODE_ENV == "development") {
  mongoose.connect(config.db.development);
} else {
  mongoose.connect(config.db.production);
}

var routes = require('./routes/index');
var users = require('./routes/users');
var room = require('./routes/room');
var usertoken = require('./routes/usertoken');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);

app.use('/api/room', jwtCheck);
app.use('/api/room', room);

app.use('/api/usertoken', jwtCheck);
app.use('/api/usertoken', usertoken);


app.use('/api/usersecure', jwtCheck);

app.get('/api/usersecure', function(req, res, next){
      var userobject = {};
    // make http call to auth0 tokeninfo service
    
    var jwtoken = req.headers["authorization"];
    jwtoken = jwtoken.replace("Bearer ", "");
    var idTokenBody = {
        id_token: jwtoken
    };

    // //works
    request.post(
        config.auth0.tenant_url+'/tokeninfo',
        {
            form:{ id_token: jwtoken }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                userobject = JSON.parse(body);
                console.log(body);
                res.json({info: '/usertoken', user: userobject});
            } else {
                res.json({info: '/usertoken', error: error});
            }                        
            return;
        }
    );    
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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


module.exports = app;