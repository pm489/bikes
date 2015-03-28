var assert = require('assert');
var bikes = require('../../lib/bikes/bikes.js');


describe('Bikes', function () {

  describe('can', function () {

    it('get nearest point', function (done) {

      var longitude = -0.069128;
      var latitude = 51.498582;
      var radius = 1000;

      bikes.getNearestBikeDock(longitude, latitude, radius).then(function (results) {

        assert.equal(results.lat, 51.502279);
        assert.equal(results.lon, -0.074189);
        assert.equal(results.startLon, -0.069128);
        assert.equal(results.startLat, 51.498582);
        assert.equal(results.radius, 1000);
        assert.equal(typeof results.availableBikes, 'string');
        done();
      }).done();

    });


  });

  it('should be able to give back longatiude and latitude for http call', function (done) {

    bikes.geocodeLocation('bermondsey').then(function (result) {
      assert.equal(result.lat, "51.49858210000001");
      assert.equal(result.lng, "-0.0691276");
      done();
    }).catch(function (result) {
      assert.equal(result, 1);
      done();
    }).done();
  });

});
