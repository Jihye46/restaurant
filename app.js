var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mysql = require('mysql');


var connection = mysql.createConnection({
	host : '14.63.196.48' ,
	port : '3306',
	user : 'root',
	password : 'Rkakdqpfm!00',
	database : 'oshow'
});

var routes = require('./routes/index');
var users = require('./routes/users');
var Ow_Rg_01 = require('./routes/Ow_Rg_01');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/Ow_Rg_01', Ow_Rg_01);



//insert
app.post('/Ow_Rg_01',function(req,res){
    var restaurant = {'restaurant_name':req.body.restaurant_name,
                'restaurant_opening_time':req.body.restaurant_opening_time,
                'restaurant_closing_time':req.body.restaurant_closing_time,
                'restaurant_type':req.body.restaurant_type,
                'restaurant_address':req.body.restaurant_address,
                'restaurant_tel':req.body.restaurant_tel
                };
    var query = connection.query('insert into restaurant set ?',restaurant,function(err,result){
        if (err) {
            console.error(err);
            throw err;
        }
        console.log(query);
        res.send(200,'success');
    });
});

//select all
app.get('/Ow_Rg_01', function(req,res){
        console.log('good');
});


//file upload


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
