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
    });


