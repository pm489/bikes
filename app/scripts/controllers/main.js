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

  details.getNearestBike = function (location, radius) {
    var host = 'http://localhost:3000';
    return $http.get(host + '/bikes?location=' + location + '&radius=' + radius).then(function (result) {
      return result.data;
    });
  };

  return details;
});

app.controller('MainCtrl', function ($scope, userLocationDetails) {
  $scope.userDetails = {
    location: 'London',
    'longitude': 40.7127,
    'latitude': 51.4738
  };

  $scope.map = {
    center: {
      latitude: $scope.userDetails.latitude,
      longitude: $scope.userDetails.longitude
    },
    zoom: 12
  };

  $scope.nearestBike = {};

  $scope.submit = function () {
    userLocationDetails.getNearestBike($scope.userDetails.location).then(function (response) {
      $scope.nearestBike = response;
    });
  };

  $scope.serviceError = false;

  userLocationDetails.setUserDetails().then(function (response) {
    console.log(response);
    $scope.userDetails = {location: response.city, latitude: response.latitude, longitude: response.longitude};
  }).catch(function () {
    $scope.serviceError = true;
  });




  var updateCenter = function () {
    $scope.map.center = {
      latitude: $scope.userDetails.latitude,
      longitude: $scope.userDetails.longitude
    };
  };

  $scope.$watch('userDetails', updateCenter);



});
