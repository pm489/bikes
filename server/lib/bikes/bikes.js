
var http = require('http');
var https = require('https');
var __ = require('underscore');
var q = require('q');

module.exports = {

  getNearestBike: function(location)
{

  var coords = geocodeLocation(location);
}

};

function geocodeLocation(location) {

  var options =
  {
    host:'https://maps.googleapis.com',
    path:'maps/api/geocode/json?address="'+location+'"'

  }

    https.get(options,function(error,response,body){
        if(!error && response.statusCode===200){
          var bestGuessLongAndLat = body['results'][0]['geometry']['location'];
        }
    });
}
