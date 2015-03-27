var express = require('express');
var path = require('path');

var hello = require('./lib/bikes/index.js');

var app = express();


// This covers serving up the index page
app.use(express.static('../.tmp'));
app.use('/bower_components', express.static('../bower_components'));
app.use(express.static('../app'));
app.use(hello);

// Error Handling
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port);
});


module.exports = app;
