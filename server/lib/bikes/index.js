var express = require('express');
var bikes = require('./bikes.js');
var app = module.exports = express();

app.get('/bikes', function (req, res) {
  var currentLocation = req.param('location');
  var radius = req.param('radius') || 200;
  if (typeof currentLocation === 'undefined' || currentLocation === "" || radius === 'undefined' ) {
    res.status(501).send("Either location or radius is  undefined. api: /bikes?location=location&radius=number")
  } else {

    bikes.getNearestBike(currentLocation,radius).then(function (response) {
      res.send(JSON.stringify(response));
    }).catch(function (error) {
      res.send("error: " + error.message);
    }).done();
  }
})
;
