/**
 * Created by jodychen on 11/22/14.
 */

// merry christmas, andy's learning git basics

var myApp = angular.module('myApp',  ['ngRoute', 'ui.bootstrap', 'uiGmapgoogle-maps']);

myApp
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'html/login.html',
                controller: 'authentication'
            })
            .when('/map', {
                templateUrl: 'html/map.html',
                // controller: 'showMap'
                // controller: 'zipCodeCtrl'
                controller: 'geoCtrl'
            })
            .when('/detail/:projId', {
                templateUrl: 'html/detail-ang.html',
                controller: 'projectListCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
        console.log('end of config function');
        })
    .config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyCfKe-nvx2gcpQDBlTjLXCQ8TerMHHV0Vw',
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });
    })
    .controller('navCtrl', function ($scope, $log) {
        $log.log('within nav function');
        $scope.isCollapsed = true;
    })
    .controller('authentication', function ($scope, $routeParams) {
        $scope.params = $routeParams;
    })
    .controller('showMap', function ($scope, $routeParams, uiGmapGoogleMapApi) {
        $scope.params = $routeParams;
        $scope.map = { center: { latitude: 40.742683, longitude: -73.873578 }, zoom: 16 };
        $scope.marker = {
            id: 1,
            coords: {
                latitude: 40.742683,
                longitude: -73.873578
            },
            options: {title:'Chan Meditation Center'}
        }
        uiGmapGoogleMapApi.then(function(maps) {
        });
        
    })
    
    
    .controller('geoCtrl', [
        '$scope', 
        'GeolocationService', 
        function ($scope, geolocation) {
            $scope.position = null;
            $scope.message = "Determining gelocation...";

            geolocation().then(
                function (position) {
                    $scope.position = position;
                }, 
                function (reason) {
                    $scope.message = "Could not be determined."
                }
            );
        }
    ]);
    
    
/*    .controller('zipCodeCtrl', [
        '$scope', 
        'ZipCodeLookupSvc', 
        function($scope, ZipCodeLookupSvc) {
            $scope.zipCode = null;
            $scope.message = 'Finding zip code...';

            ZipCodeLookupSvc.lookup().then(
                function(zipCode) {
                    $scope.zipCode = zipCode;
                }, 
                function(err) {
                    $scope.message = err;
                }
            );
        }
    ]);
    */

    
    myApp.factory('GeolocationService', [
        '$q', 
        '$window', 
        '$rootScope',
        function($q, $window, $rootScope) {
            return function() {
                var deferred = $q.defer();

                if(!$window.navigator) {
                    $rootScope.$apply(function() {
                        deferred.reject(new Error('Geolocation is not supported'));
                    });
                } 
                else {
                    $window.navigator.geolocation.getCurrentPosition(function(position) {
                        $rootScope.$apply(function() {
                                deferred.resolve(position);
                                // { lat: position.coords.latitude, lng: position.coords.longitude }
                        });
                    }, function(error) {
                        $rootScope.$apply(function() {
                            deferred.reject(error);
                        });
                    });
                }
                return deferred.promise;
            };
        }
    ]);

 /*  myApp.factory('ZipCodeLookupSvc', [
    '$q', '$http', 'GeolocationSvc',
    function($q, $http, GeolocationSvc) {
      var MAPS_ENDPOINT = 'http://maps.google.com/maps/api/geocode/json?latlng={POSITION}&sensor=false';

      return {
        urlForLatLng: function(lat, lng) {
          return MAPS_ENDPOINT.replace('{POSITION}', lat + ',' + lng);
        },

        lookupByLatLng: function(lat, lng) {
          var deferred = $q.defer();
          var url = this.urlForLatLng(lat, lng);

          $http.get(url).success(function(response) {
            // hacky
            var zipCode;
            angular.forEach(response.results, function(result) {
              if(result.types[0] === 'postal_code') {
                zipCode = result.address_components[0].short_name;
              }
            });
            deferred.resolve(zipCode);
          }).error(deferred.reject);

          return deferred.promise;
        },

        lookup: function() {
          var deferred = $q.defer();
          var self = this;

          GeolocationSvc().then(function(position) {
            deferred.resolve(self.lookupByLatLng(position.lat, position.lng));
          }, deferred.reject);

          return deferred.promise;
        }
      };
    }
  ]);
*/

//  CMC:  40.742683, -73.873578

// API key:\u0009 AIzaSyCfKe-nvx2gcpQDBlTjLXCQ8TerMHHV0Vw 
// Referers:\u0009 Any referer allowed 
// Activated on:\u0009Jan 14, 2015 11:46 AM 
// Activated by:\u0009johnandrewnewcomb@gmail.com – you 


// 40.7407323,-73.8756917