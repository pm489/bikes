var express = require('express');
var app = module.exports = express();

app.get('/bikes', function (req, res) {
  var currentLocation = req.param('location')|| "unset";
  if(currentLocation==="unset"){
    res.status(501).send("No location defined. api: /bikes?location=");
  }
  res.send("yo yo yo");
});
