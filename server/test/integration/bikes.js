var assert = require('assert');
var bikes = require('../../lib/bikes/bikes.js');


describe('Bikes', function () {

  describe('can', function () {

    it('get nearest point', function (done) {

      var longitude = -0.069128;
      var latitude = 51.498582;
      var radius = 1000;

      bikes.getNearestBikeDock(longitude, latitude, radius).then(function (results) {

        assert.equal(results.latitude, 51.502279);
        assert.equal(results.longitude, -0.074189);
        assert.equal(results.startLon, -0.069128);
        assert.equal(results.startLat, 51.498582);
        assert.equal(results.radius, 1000);
        assert.equal(results.commonName, "Curlew Street, Shad Thames");
        assert.equal(typeof results.NbBikes, 'string');
        assert.equal(typeof results.NbEmptyDocks, 'string');
        done();
      }).done();

    });


  });

  it('combine functions to get back bike details', function (done) {

    var location = 'london';
    var radius = 1000;

    bikes.getNearestBike(location, radius).then(function (results) {
      assert.equal(results.latitude, 51.508103);
      assert.equal(results.longitude, -0.126021);
      assert.equal(results.startLon, -0.1277583);
      assert.equal(results.startLat, 51.5073509);
      assert.equal(results.radius, radius);
      assert.equal(results.commonName, 'Craven Street, Strand');
      assert.equal(typeof results.NbBikes, 'string');
      assert.equal(typeof results.NbEmptyDocks, 'string');
      done();
    }).done();

  });

  it('should be able to give back longitiude and latitude for http call', function (done) {

    bikes.geocodeLocation('bermondsey').then(function (result) {
      assert.equal(result.lat, "51.49858210000001");
      assert.equal(result.lon, "-0.0691276");
      done();
    }).catch(function (result) {
      assert.equal(result, 1);
      done();
    }).done();
  });

});
