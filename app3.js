/*app1: removed users variable and route and added app.set('view options') for changing layouts.  Change app to app1 in bin/www.

app2: imported express-handlebars after npm install (effectively made app.set('view options) unecessary.

app3: imported mongoose after npm install and passed server path (default is localhost:27017).  
Pass a directory for database (/shopping after port number).  If none exists, it will make one. 
*/

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');

var index = require('./routes/index2');
// removed var users = require('./routes/users');

var app = express();

mongoose.connect('localhost:27017/shopping')

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout2', extname: '.hbs'}));
app.set('view engine', '.hbs');

// unecessary app.set('view options', { layout: 'layout1' });


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// removed app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
