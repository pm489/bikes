'use strict';

describe('Factory:', function () {
  beforeEach(module('yoAngularApp'));

  describe('mapMarkers', function () {
    var mapFactory;

    beforeEach(inject(function (_mapMarkers_) {
      mapFactory = _mapMarkers_;
    }));

    it('should construct correct marker', function () {

      var header = 'Header',
        content = 'some stuff',
        marker = mapFactory.makeMarker({latitude: 123, longitude: 456}, 1, header, content);


      expect(marker.latitude).toBe(123);
      expect(marker.longitude).toBe(456);
      expect(marker.id).toBe(1);
      expect(marker.show).toBe(false);
      expect(marker.options.content).toBe('<div><h3>' + header + '</h3><p>' + content + '</p></div>');
    });

    it('should hide undefined header', function () {
      var content = 'some stuff',
        marker = mapFactory.makeMarker({latitude: 123, longitude: 456}, 1, undefined, content);


      expect(marker.latitude).toBe(123);
      expect(marker.longitude).toBe(456);
      expect(marker.id).toBe(1);
      expect(marker.show).toBe(false);
      expect(marker.options.content).toBe('<div><h3></h3><p>' + content + '</p></div>');
    });

    it('should hide undefined content', function () {
      var header = 'Header',
        marker = mapFactory.makeMarker({latitude: 123, longitude: 456}, 1, header, undefined);


      expect(marker.latitude).toBe(123);
      expect(marker.longitude).toBe(456);
      expect(marker.id).toBe(1);
      expect(marker.show).toBe(false);
      expect(marker.options.content).toBe('<div><h3>' + header + '</h3><p></p></div>');
    });

  });

  describe('userDetailsFactory', function () {

    var userFactory, httpBackend;

    beforeEach(inject(function (_userLocationDetails_, $httpBackend) {
      httpBackend = $httpBackend;
      userFactory = _userLocationDetails_;
    }));

    afterEach(function () {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });


    // check to see if it has the expected function
    it('should have an setUserDetails function', function () {
      expect(angular.isFunction(userFactory.setUserDetails)).toBe(true);
    });

    it('should be able to call factory method', function () {
      httpBackend.expectGET('http://www.telize.com/geoip').respond(200, {
          'longitude': -0.0965,
          'latitude': 51.4738,
          'asn': 'AS5607',
          'offset': '3',
          'ip': '5.70.208.225',
          'area_code': '0',
          'continent_code': 'EU',
          'dma_code': '0',
          'city': 'London',
          'timezone': 'Asia\/Bahrain',
          'region': 'London, City of',
          'country_code': 'GB',
          'isp': 'British Sky Broadcasting Limited',
          'postal_code': 'SE24',
          'country': 'United Kingdom',
          'country_code3': 'GBR',
          'region_code': 'H9'
        }
      );


      var resultsPromise = userFactory.setUserDetails();

      resultsPromise.then(function (response) {
        expect(response.city).toBe('London');
      });
      httpBackend.flush();


    });


    it('should be able to get my nearest bike location', function () {
      var lat = 51.508103;
      var lon = -0.126021;
      var startLon = -0.1277583;
      var startLat = 51.5073509;
      var radius = 200;
      var availableBikes = '21';

      httpBackend.expectGET('/bikes?location=london&radius=200').respond(200, {
        'lat': lat,
        'lon': lon,
        'startLon': startLon,
        'startLat': startLat,
        'radius': radius,
        'availableBikes': availableBikes
      });

      var resultsPromise = userFactory.getNearestBike('london', radius);

      resultsPromise.then(function (response) {
        expect(response.lat).toBe(lat);
        expect(response.lon).toBe(lon);
        expect(response.startLon).toBe(startLon);
        expect(response.startLat).toBe(startLat);
        expect(response.radius).toBe(radius);
        expect(response.availableBikes).toBe(availableBikes);
      });

      httpBackend.flush();
    });


  });

});



