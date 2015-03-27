'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('yoAngularApp'));

  var MainCtrl,
    userFactory,
    scope,
    httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $http, $httpBackend, _userLocationDetails_) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    userFactory =_userLocationDetails_;
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      userFactory : userFactory
    });
  }));



  it('should get my location from geoLocation from http call', function () {
    httpBackend.when('GET', 'http://www.telize.com/geoip').respond(200, {
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
    httpBackend.flush();


    expect(scope.userDetails.location).toBe('London');
    expect(scope.userDetails.latitude).toBe(51.4738);
    expect(scope.userDetails.longitude).toBe(-0.0965);
  });

  it('should error if service is down', function () {
    httpBackend.when('GET', 'http://www.telize.com/geoip').respond(500,[]);
    httpBackend.flush();


    expect(scope.serviceError).toBe(true);
  });
});
