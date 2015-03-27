'use strict';

describe('Factory: userDetailsFactory', function () {

  var userFactory,httpBackend;

  beforeEach(module('yoAngularApp'));

  beforeEach(inject(function(_userLocationDetails_,$httpBackend){
    httpBackend= $httpBackend;
    userFactory = _userLocationDetails_;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });


  // check to see if it has the expected function
  it('should have an exciteText function', function () {
    expect(angular.isFunction(userFactory.setUserDetails)).toBe(true);
  });

it('should be able to call factory method', function(){
  httpBackend.expectGET( 'http://www.telize.com/geoip').respond(200, {
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


  var resultsPromise =  userFactory.setUserDetails();

  var result={};
  resultsPromise.then(function(response){
    result=response;
  });
  httpBackend.flush();

  expect(result.city).toBe('London');
});

});
