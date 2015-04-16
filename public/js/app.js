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
            .when('/dharma-centers', {
		    templateUrl: 'html/map.html',
			// controller: 'showMap'
			// controller: 'zipCodeCtrl'
			controller: 'geoCtrl'
			})
            .when('/dharma-dictionary/:defId', {
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
	    $http.get('/cms/ddefs/articleindex.json').success (function(data){
		    ddefs = angular.fromJson(data);
		    $scope.ddefs = ddefs;
		    $http.get('/cms/ddefs' + ddefs[$scope.params.defId].Url).success (function(data){
			    $scope.myHTML = data;
			});
		});
	})

    .controller('geoCtrl', [ '$http',
			    '$scope', 
			    'GeolocationService',
			    'uiGmapIsReady',
			     function ($http, $scope, geolocation ) {
			var markers;
			$scope.position = null;
			$scope.message = "Determining geolocation...";
				
			$http.get('/cms/map/dharmacenters.json').success (function(data){
				markers = angular.fromJson(data);
			    });
			geolocation().then(function (position, IsReady) {
				"use strict";
				$scope.position = position;
				$scope.map = { 
				    center: { latitude: $scope.position.coords.latitude, longitude: $scope.position.coords.longitude }, 
				    zoom: 13 
				};
				$scope.markers = [];
				$scope.selected = {show: false};
				$scope.windowOptions = {
				    visible: false
				};
				$scope.onClick = function() {
				    $scope.windowOptions.visible = !$scope.windowOptions.visible;
				};
				$scope.closeClick = function() {
				    $scope.windowOptions.visible = false;
				};

				var i=0;
				for ( ; i < markers.length; i++ ) {
				    // console.log("marker: " + i);

				    $scope.markers.push({ 
					    coords: {
						latitude : markers[i].latitude, 
						longitude : markers[i].longitude
						}, 
					    options: { 
						title: markers[i].street, 
						labelContent: markers[i].label, 
						labelClass: 'map-marker' 
						},
						icon:  markers[i].iconcode === 1 ? '/img/mapicons/617865.png' :'/img/mapicons/1429219853_museum-128.png' ,
 					    events: {
						click : function (innerkey) { return function() { 

							// console.log("Clicked! ", innerkey);
							 $scope.selected.show = false;
							 $scope.selected = $scope.markers[innerkey];
							 $scope.selected.show = !$scope.selected.show;
							 $scope.selected.onCloseClick = function() {
							    $scope.selected.show = false;
							    // console.log("CloseClicked");
							    $scope.$apply();
							};
						    }}(i)
							  }
					});
				    $scope.markers[i].id = i+1;
				}

				$scope.markers.push( { 
					    id: i+1, coords: { 
					    latitude: $scope.position.coords.latitude, 
						longitude: $scope.position.coords.longitude
						},
					    options: {
					        title:'This is Where You Are', 
						labelContent : 'You Are Here', 
						labelClass: 'map-marker' 
						},
   					    icon:  '/img/mapicons/617865.png',
					    events: {
						click : function (innerkey) { return function() { 

						    // console.log("Clicked! ", innerkey);
							 $scope.selected.show = false;
							 $scope.selected = $scope.markers[innerkey];
							 $scope.selected.show = !$scope.selected.show;


							 $scope.selected.onCloseClick = function() {
							    $scope.selected.show = false;
							    // console.log("CloseClicked");
							    $scope.$apply();
							};
						    }}(i)
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