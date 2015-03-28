'use strict';
var contentString = '<div><h3>You, Right Now!</h3></div>';

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
    location: 'Lincoln',
    'longitude': 96.41,
    'latitude': 40.49
  };
  $scope.radius = 500;

  $scope.map = {
    center: {
      latitude: $scope.userDetails.latitude,
      longitude: $scope.userDetails.longitude
    },
    zoom: 12
  };

  $scope.markers = {};
  $scope.markers.marker = [];


  $scope.submit = function () {
    userLocationDetails.getNearestBike($scope.userDetails.location, $scope.radius).then(function (response) {
      console.log(response);

      var items = {id: 'start',
        latitude: response.lat,
        options: {maxWidth: 400, content: contentString},
        longitude: response.lon};
      $scope.markers.marker.push(items);
    });
  };

  $scope.serviceError = false;

  userLocationDetails.setUserDetails().then(function (response) {
    console.log(response);
    $scope.userDetails = {location: response.city, latitude: response.latitude, longitude: response.longitude};
    var items = {
      show: false,
      id: 'home',
      options: {maxWidth: 400, content: contentString},
      latitude: response.latitude,
      longitude: response.longitude
    };
    items.onClick = function () {
      items.show = !items.show;
    };
    $scope.markers.marker.push(items);
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
