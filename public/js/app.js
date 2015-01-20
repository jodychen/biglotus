/**
 * Created by jodychen on 11/22/14.
 */


/*
var ddefs = [{  Title: "Title ABC", Url: "/abc.html" },
	     {  Title: "Title One", Url: "/one.html" },
	     {  Title: "Title Page", Url: "/page.html" },
	     {  Title: "Title Two", Url: "/two.html" }
	     ];

*/

var myApp = angular.module('myApp',  ['ngRoute', 'ui.bootstrap', 'uiGmapgoogle-maps', 'ngSanitize']);

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
            .when('/dharmadictionary/:defId', {
                templateUrl: 'html/detail-ddef.html',
                controller: 'ddefCtrl'
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
    .config(['$compileProvider', function ($compileProvider) {
	$compileProvider.debugInfoEnabled(false);
    }])  
    /*  If you wish to debug an application with this information then 
     * you should open up a debug console in the browser then call this method directly in this console:
     * angular.reloadWithDebugInfo(); 
     */
    .controller('navCtrl', function ($scope, $log) {
        $log.log('within nav function');
        $scope.isCollapsed = true;
    })
    .controller('authentication', function ($scope, $routeParams) {
        $scope.params = $routeParams;
    })
    .controller('ddefCtrl', function ($scope, $routeParams, $http) {
	    var ddefs;
	    $scope.params = $routeParams;
	    $http.get('/html/ddefs/_articles/_dist/abc.json').success (function(data){
		      console.log( 'data = ' + data);
		    ddefs = angular.fromJson(data);
		    $scope.ddefs = ddefs;
		    $http.get('/html/ddefs/_articles/_dist/' + ddefs[$scope.params.defId].Url).success (function(data){
			    $scope.myHTML = data;
		});
	    });
	})

    .controller('ExampleController', [
				      '$scope',
				      'uiGmapIsReady',

				      function ($scope, IsReady) {
					  $scope.center = {
					      latitude: 30,
					      longitude: -90
					  };
					  $scope.zoom = 8;
					  $scope.control = {};
					  IsReady.promise().then(function (maps) {
						  var map1 = $scope.control.getGMap();
						  var map2 = maps[0].map;
						  alert(map1 === map2);
					      });
				      }])



    .controller('geoCtrl', [
        '$scope', 
        'GeolocationService', 
				      'uiGmapIsReady',
        function ($scope, geolocation) {
            $scope.position = null;
            $scope.message = "Determining geolocation...";

            geolocation().then(
			       function (position, IsReady) {
                    $scope.position = position;
                    $scope.map = { center: { latitude: $scope.position.coords.latitude, longitude: $scope.position.coords.longitude }, zoom: 13 };
                    $scope.marker1 = {
                        id: 1,
                        coords: {
                            latitude: 40.742683,
                            longitude: -73.873578
                        },
                        options: {title:'Chan Meditation Center', labelContent : 'Chan Meditation Center of Dharma Drum', labelClass: 'nav-marker'}
                    }
                    $scope.marker2 = {
                        id: 2,
                        coords: {
                            latitude: $scope.position.coords.latitude, longitude: $scope.position.coords.longitude
                        },
                        options: {title:'You Are Here', labelContent : 'This is Where You Are', labelClass: 'nav-marker' }
                    }
                }, 
                function (reason) {
                    $scope.message = "Could not be determined."
                }
            );
        }

    ]);
    
    
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
                                // deferred.resolve({ lat: position.coords.latitude, lng: position.coords.longitude });
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


//  CMC:  40.742683, -73.873578

// API key:\u0009 AIzaSyCfKe-nvx2gcpQDBlTjLXCQ8TerMHHV0Vw 
// Referers:\u0009 Any referer allowed 
// Activated on:\u0009Jan 14, 2015 11:46 AM 
// Activated by:\u0009johnandrewnewcomb@gmail.com – you 


// 40.7407323,-73.8756917
