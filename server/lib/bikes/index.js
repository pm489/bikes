var express = require('express');
var bikes = require('./bikes.js');
var app = module.exports = express();

app.get('/bikes', function (req, res) {
  var currentLocation = req.param('location')|| "unset";
  if(currentLocation==="unset"){
    res.status(501).send("No location defined. api: /bikes?location=");
  }

  bikes.geocodeLocation(currentLocation).then(function(response){
    res.send("done" + JSON.stringify(response));
  }).done();
});
