var http = require('http');
var https = require('https');
var __ = require('underscore');
var Q = require('q');


var geocodeLocation = function (location) {
  var deferred = Q.defer();


  http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + location, function (response) {
    if (response.statusCode === 200) {
      var body = '';

      response.on('data', function (chunk) {
        body += chunk;
      });

      response.on('end', function () {
        body = JSON.parse(body);
        if (body['status'] == 'OK') {
          var location = body['results'][0]['geometry']['location'];
          deferred.resolve({lon: location.lng, lat: location.lat});
        } else {
          deferred.reject(new Error("no results found for that location and body.status is" + JSON.stringify(body['status'])));
        }
      })
    } else {
      deferred.reject(new Error('{status:' + response.statusCode + '}'));
    }
  });

  return deferred.promise;
};

var getNearestBikeDock = function (longatiude, lattude, raidus) {
  var deferred = Q.defer();

  http.get('http://api.tfl.gov.uk/BikePoint?lat=' + lattude + '&lon=' + longatiude + '&radius=' + raidus + '&app_id=&app_key=', function (response) {
    if (response.statusCode === 200) {
      var body = '';

      response.on('data', function (chunk) {
        body += chunk;
      });
      response.on('end', function () {
        body = JSON.parse(body);
        var places = body['places'];

        if (places.length == 0) {
          deferred.reject(new Error("no places found"));
        } else {
          var nearestPlace = places[0];
          var lat = nearestPlace['lat'];
          var lon = nearestPlace['lon'];
          var extraInfo = nearestPlace['additionalProperties'];

          var availableBikes = __.find(extraInfo, function (info) {
            return info["key"] === 'NbBikes';
          })['value'];

          deferred.resolve({
            lat: lat,
            lon: lon,
            startLon: longatiude,
            startLat: lattude,
            radius: raidus,
            availableBikes: availableBikes
          });
        }
      })
    } else {
      deferred.reject(new Error('{status:' + response.statusCode + '}'));
    }
  });

  return deferred.promise;
};

var getNearestBike = function (location, radius) {

  return geocodeLocation(location)
    .then(function (location) {
      return getNearestBikeDock(location.lon, location.lat, radius)
        .then(function (result) {
          return result;
        }
      );
    }).catch(function (error) {
      throw new Error(error.message);
    });

};


module.exports = {
  getNearestBike: getNearestBike,
  geocodeLocation: geocodeLocation,
  getNearestBikeDock: getNearestBikeDock
};
