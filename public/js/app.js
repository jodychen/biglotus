/**
 * Created by jodychen on 11/22/14.
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
    .controller('ddefCtrl', function ($scope, $routeParams, $http) {
	    var ddefs;
	    $scope.params = $routeParams;
	    $http.get('/html/ddefs/_articles/_dist/abc.json').success (function(data){
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
					  /* IsReady.promise().then(function (maps) {
						  var map1 = $scope.control.getGMap();
						  var map2 = maps[0].map;
						  alert(map1 === map2);
						  }); */
				      }])



    .controller('geoCtrl', [ '$http',
			    '$scope', 
			    'GeolocationService',
			    'uiGmapIsReady',
			     function ($http, $scope, geolocation ) {
			var markers;
			$scope.position = null;
			$scope.message = "Determining geolocation...";
				
			$http.get('/html/dharmacenters.json').success (function(data){
				markers = angular.fromJson(data);
			    });
			geolocation().then(function (position, IsReady) {
				$scope.position = position;
				$scope.map = { 
				    center: { latitude: $scope.position.coords.latitude, longitude: $scope.position.coords.longitude }, 
				    zoom: 13 
				};
				$scope.markers = [];
				for ( var i=0; i < markers.length; i++ ) {
				    $scope.markers.push( { 
					    coords: { latitude : markers[i].latitude, 
						    longitude : markers[i].longitude}, 
						options: { 
						title: markers[i].street, 
						    labelContent: markers[i].label, 
						    labelClass: 'nav-marker' }
					});
				    $scope.markers[i].id = i+1;
				}

				$scope.markers.push( { 
					id: i, coords: { 
					    latitude: $scope.position.coords.latitude, 
						longitude: $scope.position.coords.longitude
						},
					    options: {
					    title:'This is Where You Are', 
						labelContent : 'You Are Here', 
						labelClass: 'nav-marker' 
						}
				    });
			    }, 
			    function (reason) { $scope.message = "Could not be determined." });
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