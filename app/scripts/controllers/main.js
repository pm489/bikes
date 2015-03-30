'use strict';

var app = angular.module('yoAngularApp');

app.factory('mapMarkers', function () {

  var markers = {};

  markers.makeMarker = function (response, id, header, content) {
    var contentString = '<div><h3>' + (angular.isUndefined(header) ? '' : header) + '</h3><p>' + (angular.isUndefined(content) ? '' : content) + '</p></div>';
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
      return $http.get('/bikes?location=' + location + '&radius=' + radius).then(function (result) {
        return result.data;
      });
    };

    return details;
  }
)
;

app.controller('MainCtrl', function ($scope, $q, $filter, userLocationDetails, mapMarkers) {
  $scope.userDetails = {
    location: 'London',
    longitude: -0.1333,
    latitude: 51.4738,
    destination: '',
    radius: 500
  };

  userLocationDetails.setUserDetails().then(function (response) {
    $scope.userDetails = {
      location: response.city,
      latitude: response.latitude,
      longitude: response.longitude,
      destination: $scope.userDetails.destination,
      radius: $scope.userDetails.radius
    };
    $scope.markers.marker.push(mapMarkers.makeMarker(response, 'home', 'You right now'));
  }).catch(function () {
    $scope.serviceError = true;
  });

  $scope.map = {
    control:{},
    center: {
      latitude: $scope.userDetails.latitude,
      longitude: $scope.userDetails.longitude
    },
    zoom: 10
  };

  var updateCenter = function () {
    $scope.map.center = {
      latitude: $scope.userDetails.latitude,
      longitude: $scope.userDetails.longitude
    };
  };

  $scope.$watch('userDetails', updateCenter);

  $scope.markers = {};
  $scope.markers.marker = [];


  var nearestBike = function (location, radius, id) {
    var deferred = $q.defer();
    userLocationDetails.getNearestBike(location, radius).then(function (response) {
      deferred.resolve(mapMarkers.makeMarker(response, id, response.commonName, 'No of free bikes: ' + response.NbBikes + '<br> No of emptry spaces: ' + response.NbEmptyDocks));

    }).catch(function (error) {
      deferred.reject(new Error(error.message));
    });

    return deferred.promise;
  };

  $scope.submit = function () {
    nearestBike($scope.userDetails.location, $scope.userDetails.radius, 'start').then(function (result) {
      $scope.markers.marker = $scope.markers.marker.filter(function (item) {
        return item.id !== result.id;
      });
      $scope.markers.marker.push(result);
      if (!angular.isUndefined($scope.userDetails.destination) || $scope.userDetails.destination !== '') {

        nearestBike($scope.userDetails.destination, $scope.userDetails.radius, 'destination').then(function (result) {
          $scope.markers.marker = $scope.markers.marker.filter(function (item) {
            return item.id !== result.id;
          });
          $scope.markers.marker.push(result);
        });
      }
    }).catch(function (error) {
      console.log(error.message);
    });
  };

});
