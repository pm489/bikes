var express = require('express');
var bikes = require('./bikes.js');
var app = module.exports = express();

app.get('/bikes', function (req, res) {
  var currentLocation = req.param('location') || "empty";

  console.log("curr = " + currentLocation);
  if (currentLocation === "empty") {
    res.status(501).send("No location defined. api: /bikes?location=")
  } else {
    var radius = req.param('radius') || 200;
    bikes.geocodeLocation(currentLocation).then(function (response) {
      res.send(JSON.stringify(response));
    }).catch(function (error) {
      res.send("error: " + error.message);
    }).done();
  }
})
;
