'use strict';

/**
 * @ngdoc overview
 * @name clientePlanificadorApp
 * @description
 * # clientePlanificadorApp
 *
 * Main module of the application.
 */
angular
  .module('clientePlanificadorApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ui.calendar'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
