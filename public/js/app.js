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
                controller: 'showMap'
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
            title:"Chan Meditation Center"
        }
         uiGmapGoogleMapApi.then(function(maps) {
        
    });

//  CMC:  40.742683, -73.873578

// API key:\u0009 AIzaSyCfKe-nvx2gcpQDBlTjLXCQ8TerMHHV0Vw 
// Referers:\u0009 Any referer allowed 
// Activated on:\u0009Jan 14, 2015 11:46 AM 
// Activated by:\u0009johnandrewnewcomb@gmail.com – you 


// 40.7407323,-73.8756917