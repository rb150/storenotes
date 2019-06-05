/*app1: removed users variable and route and added app.set('view options') for changing layouts.  Change app to app1 in bin/www.

app2: imported express-handlebars after npm install (effectively made app.set('view options) unecessary.

app3: imported mongoose after npm install and passed server path (default is localhost:27017).  
Pass a directory for database (/shopping after port number).  If none exists, it will make one.

app4: imported sessions after npm install and set up in middleware portion of code (after cookiParser)
Session is enabled with session() method.  In method, put a javascript object.  In object, provide a secret, and
and specify the resave and saveUninitialized to false.  The defaults are true, but they are deprecated.  Resave, if set to true,
will make the session saved on the server for each request no matter if something changed or not.  saveUninitialzed if true, the session
will be stored on the server even though it might not have been initialized.

app5: imported passport and connect-flash.  Initialize flash after session since it uses session.  After flash, intialize passport.
After passport is initialized, set passport to use session.

app6: after mongoose.connect, require the config file (./config/passport#) so that passport can use these strategies.
This doesn't need to be binded to a variable since we want it to immediately load it.  It will run through the file and give us
the configuration.  This is essentially the same as copying and pasting the file into that spot (did not want to bloat).

app7: import (require) express-validator after npm install.  Start (app.use) validator after body-parser, because the validator will on
its own parse the body and retrieve the parameters you want to validate from the submitted request body.  Therefore, this has to be done
after the body is parsed otherwise you can't validate it.  
*/

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');


var index = require('./routes/index6');
// removed var users = require('./routes/users');

var app = express();

mongoose.connect('localhost:27017/shopping')
require('./config/passport3');

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout2', extname: '.hbs'}));
app.set('view engine', '.hbs');

// unecessary app.set('view options', { layout: 'layout1' });


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({secret: 'mysupersecret', resave: false, saveUninitialized: false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
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
