var assert = require('assert');
var bikes = require('../../lib/bikes/bikes.js');
var nock = require('nock');

describe('can find nearest bikes', function () {

  it('using location and radius', function (done) {
    var lat = 123,
      lon = 456,
      radius = 200,
      location = 'london',
      resultLat = 51.502279,
      resultLng = -0.074189,
      commonName = "Somewhere, someplace",
      totalBikes = "8";

    nock('http://maps.googleapis.com').get('/maps/api/geocode/json?address=' + location)
      .reply(200, {
        status: "OK",
        results: [{
          "geometry": {
            "location": {
              "lat": lat,
              "lng": lon
            }
          }
        }]
      });

      nock('http://api.tfl.gov.uk')
      .get('/BikePoint?lat=' + lat + '&lon=' + lon + '&radius=' + radius + '&app_id=&app_key=')
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
            "commonName": commonName,
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
              },
              {
                "$type": "Tfl.Api.Presentation.Entities.AdditionalProperties, Tfl.Api.Presentation.Entities",
                "category": "Description",
                "key": "NbEmptyDocks",
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


    bikes.getNearestBike(location, radius).then(function (results) {
      console.log(results);
      assert.equal(results.latitude, resultLat);
      assert.equal(results.longitude, resultLng);
      assert.equal(results.startLon, lon);
      assert.equal(results.startLat, lat);
      assert.equal(results.radius, radius);
      assert.equal(results.commonName, commonName);
      assert.equal(results.NbBikes, totalBikes);
      assert.equal(results.NbEmptyDocks, totalBikes);
      done();
    }).done();
  });

  it('errors bubble', function (done) {
    var lat = 123,
      lon = 456,
      radius = 200,
      location = 'london',
      resultLat = 51.502279,
      resultLng = -0.074189,
      totalBikes = "8";

    nock('http://maps.googleapis.com').get('/maps/api/geocode/json?address=' + location)
      .reply(500, {
        status: "OK",
        results: [{
          "geometry": {
            "location": {
              "lat": lat,
              "lng": lon
            }
          }
        }]
      });

    nock('http://api.tfl.gov.uk')
      .get('/BikePoint?lat=' + lat + '&lon=' + lon + '&radius=' + radius + '&app_id=&app_key=')
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


    bikes.getNearestBike(location, radius).catch(function (error) {
      assert.equal(error.message, "{status:500}");
      done();
    }).done();
  });
});
