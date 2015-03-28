var assert = require('assert');
var bikes = require('../../lib/bikes/bikes.js');
var nock = require('nock');


describe('Bikes', function () {
  describe('can get log and lat position (best guess) from city', function () {

    it('should throw an error if no results are found', function(done) {

      nock('http://maps.googleapis.com').get('/maps/api/geocode/json?address=someMadeUpPlace')
        .reply(200, {
          status: "NORESULTS",
          results: []
        });

      bikes.geocodeLocation('someMadeUpPlace').catch(function(error){
        assert.equal(error,error);
        done();
      }).done();
    });


    it('should be able to give back longitude and latitude for http call', function (done) {

      nock('http://maps.googleapis.com').get('/maps/api/geocode/json?address=london')
        .reply(200, {
          status:"OK",
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
