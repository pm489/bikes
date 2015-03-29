'use strict';

var app = angular.module('yoAngularApp');

app.factory('mapMarkers', function () {

  var markers = {};

  markers.makeMarker = function (response, id, header, content) {
    var contentString = '<div><h3>' + (angular.isUndefined(header)?'':header) + '</h3><p>' + (angular.isUndefined(content)?'':content) + '</p></div>';
    var item = {
      show: false,
      id: id,
      options: {maxWidth: 400, content: contentString},
      latitude: response.latitude,
      longitude: response.longitude
    };
    item.onClick = function () {
      item.show = !item.show;
    };
    return item;
  };

  return markers;

});

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

app.controller('MainCtrl', function ($scope, userLocationDetails, mapMarkers) {
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
      var id = $scope.markers.marker.length + 1;
      $scope.markers.marker.push(mapMarkers.makeMarker(response, id, response.commonName, 'No of free bikes: ' + response.NbBikes + '<br> No of emptry spaces: ' + response.NbEmptyDocks));
    });
  };

  $scope.serviceError = false;

  userLocationDetails.setUserDetails().then(function (response) {
    console.log(response);
    $scope.userDetails = {location: response.city, latitude: response.latitude, longitude: response.longitude};
    $scope.markers.marker.push(mapMarkers.makeMarker(response, 'home', 'You right now'));
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
