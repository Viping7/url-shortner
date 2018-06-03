const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const database = require('./config/datasource');

const indexRouter = require('./routes/index');

// Intialize Express App
let app = express();

// Database Connection
database.connect((err) => {
  if (err)
    console.log('Error connecting database.. :(');
  else
    console.log('Connected to database successfully.. :)')
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.send({
    'error': 'Error'
  });
  // render the error page
  res.status(err.status || 500);

});

module.exports = app;