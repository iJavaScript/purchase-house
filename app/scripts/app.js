'use strict';

angular.module('purchaseHouseApp', [
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
        .when('/help', {
           templateUrl: 'views/help.html'
        })
      .otherwise({
        redirectTo: '/'
      });
  });
