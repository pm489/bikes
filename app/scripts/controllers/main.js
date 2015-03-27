'use strict';

var app = angular.module('yoAngularApp');

app.factory('userLocationDetails', function ($http) {
  var details = {};

  details.setUserDetails = function () {
    return $http.get('http://www.telize.com/geoip').then(function (result) {
        return result.data;
      }
    );
  };

  details.getNearestBike = function (location) {
    var host = 'http://locahost:9000';
    return $http.get(host + '/bikes').then(function (result) {
      return result.data;
    })
  };

  return details;
});

app.controller('MainCtrl', function ($scope, userLocationDetails) {
  $scope.userDetails = {
    location: 'London',
    'longitude': 40.7127,
    'latitude': 51.4738
  };

  $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8, control: {} };


  $scope.submit = function () {
    userLocationDetails.getNearestBike();
  };

  $scope.serviceError = false;

  userLocationDetails.setUserDetails().then(function (response) {
    $scope.userDetails = {location: response.city, latitude: response.latitude, longitude: response.longitude};
  }).catch(function () {
    $scope.serviceError = true;
  });


/*  var updateCenter = function () {
    $scope.map.control.getGMap();
  };

  $scope.$watch('lat', updateCenter);
  $scope.$watch('long', updateCenter);*/


});
