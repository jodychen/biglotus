/**
 * Created by jodychen on 11/22/14.
 */

// merry christmas, andy's learning git basics

var myApp = angular.module('myApp',  ['ngRoute', 'ui.bootstrap']);

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
    .controller('navCtrl', function ($scope, $log) {
        $log.log('within nav function');
        $scope.isCollapsed = true;
    })
    .controller('authentication', function ($scope, $routeParams) {
        $scope.params = $routeParams;
    })
    .controller('showMap', function ($scope, $routeParams) {
        $scope.params = $routeParams;
    });

//  CMC:  40.742683, -73.873578

// API key:\u0009 AIzaSyCfKe-nvx2gcpQDBlTjLXCQ8TerMHHV0Vw 
// Referers:\u0009 Any referer allowed 
// Activated on:\u0009Jan 14, 2015 11:46 AM 
// Activated by:\u0009johnandrewnewcomb@gmail.com – you 


// 40.7407323,-73.8756917