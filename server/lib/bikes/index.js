var express = require('express');
var bikes = require('./bikes.js');
var app = module.exports = express();

app.get('/bikes', function (req, res) {
  var currentLocation = req.param('location');
  if (typeof currentLocation === 'undefined' || currentLocation === "") {
    res.status(501).send("No location defined. api: /bikes?location=")
  } else {
    var radius = req.param('radius') || 200;
    bikes.getNearestBike(currentLocation,radius).then(function (response) {
      res.send(JSON.stringify(response));
    }).catch(function (error) {
      res.send("error: " + error.message);
    }).done();
  }
})
;
