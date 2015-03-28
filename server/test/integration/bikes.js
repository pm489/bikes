var assert = require('assert');
var bikes = require('../../lib/bikes/bikes.js');



describe('Bikes', function () {
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
