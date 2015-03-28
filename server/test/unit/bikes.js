var assert = require('assert');
var bikes = require('../../lib/bikes/bikes.js');
var nock = require('nock');


describe('Bikes', function () {

  describe('can get nearest dock', function () {

    it('can get nearest point', function (done) {


      var lat = 123;
      var lon = 456;
      var radius = 1000;


      var resultLat = 51.502279;
      var resultLng = -0.074189;
      var totalBikes = "8";
      nock('http://api.tfl.gov.uk').get('/BikePoint?lat=' + lat + '&lon=' + lon + '&radius=' + radius + '&app_id=&app_key=')
        .reply(200, {
          "$type": "Tfl.Api.Presentation.Entities.PlacesResponse, Tfl.Api.Presentation.Entities",
          "centrePoint": [
            51.498,
            -0.069
          ],
          "places": [
            {
              "$type": "Tfl.Api.Presentation.Entities.Place, Tfl.Api.Presentation.Entities",
              "id": "BikePoints_298",
              "url": "http://api.prod6.live.tfl.gov.uk/Place/BikePoints_298",
              "commonName": "Curlew Street, Shad Thames",
              "distance": 596.6703936461496,
              "placeType": "BikePoint",
              "additionalProperties": [
                {
                  "$type": "Tfl.Api.Presentation.Entities.AdditionalProperties, Tfl.Api.Presentation.Entities",
                  "category": "Description",
                  "key": "NbBikes",
                  "sourceSystemKey": "BikePoints",
                  "value": totalBikes,
                  "modified": "2015-03-28T15:10:06.663"
                }
              ],
              "children": [],
              "lat": resultLat,
              "lon": resultLng
            }
          ]
        });


      bikes.getNearestBikeDock(lon, lat, radius).then(function (results) {
        assert.equal(results.lat,resultLat);
        assert.equal(results.lon,resultLng);
        assert.equal(results.startLon,lon);
        assert.equal(results.startLat,lat);
        assert.equal(results.radius,radius);
        assert.equal(results.availableBikes,totalBikes);
        done();
      }).done();

    });


  });

  describe('can get long and lat position (best guess) from address', function () {

    it('should throw an error if no results are found', function (done) {

      nock('http://maps.googleapis.com').get('/maps/api/geocode/json?address=someMadeUpPlace')
        .reply(200, {
          status: "NORESULTS",
          results: []
        });

      bikes.geocodeLocation('someMadeUpPlace').catch(function (error) {
        assert.equal(error, error);
        done();
      }).done();
    });


    it('should be able to give back longitude and latitude for http call', function (done) {

      nock('http://maps.googleapis.com').get('/maps/api/geocode/json?address=london')
        .reply(200, {
          status: "OK",
          results: [{
            "geometry": {
              "location": {
                "lat": 123,
                "lng": 456
              }
            }
          }]
        });

      bikes.geocodeLocation('london').then(function (result) {
        assert.equal(result.lat, "123");
        assert.equal(result.lng, "456");
        done();
      }).done();
    });
  });

});
