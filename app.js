var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var product = require('./routes/product');
var order = require('./routes/order');
var user = require('./routes/user');
var common = require('./routes/common');
var address = require('./routes/address');
var cart = require('./routes/cart');
var payment = require('./routes/payment');

var app = express();
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
}

app.use(allowCrossDomain);

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json({limit: '200mb'}));
app.use(expressValidator());
app.set('view engine', 'pug');
app.set('views', './views');
/*app.use('/template', express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public')));*/
app.use('/css', express.static(path.join(__dirname, 'public/stylesheets')));
app.use(express.static(path.resolve('../ostinohealth/client/dist')));

app.use('/api/user', user);
app.use('/api/product', product);
app.use('/api/common', common);
app.use('/api/address', address);
app.use('/api/cart', cart);
app.use('/api/orders', order);
app.use('/api/payment', payment);


app.use('*', express.static(path.resolve('../ostinohealth/client/dist')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;


/*
var express = require('express');
//var session = require('express-session');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var helmet = require('helmet')

var index = require('./routes/index');
var users = require('./routes/users');
var bodyParser = require("body-parser");

var app = express();
//app.use(session({secret: 'ssshhhhh'}));
//app.use(helmet());
//app.use(express.static(path.join(__dirname, 'public')));
//app.set('views', path.join(__dirname, 'views'));
//app.use(express.static('public'));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));

app.use(function(req, res,next) {
  res.header("Access-Control-Allow-Origin", "https://learnaid.humonics.ai");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  next();
});
// view engine setup
/!*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');*!/

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'icon.png')));

/!*app.use(cookieParser());*!/
app.use(express.static(path.resolve('../dist')));
/!*app.use('/', index);
app.use('/users', users);*!/
//app.use('/', express.static(path.resolve('../dist')));




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
  /!*res.render('error');*!/
});

module.exports = app;
*/
