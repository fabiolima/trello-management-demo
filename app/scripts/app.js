'use strict';

/**
 * @ngdoc overview
 * @name trelloManagementApp
 * @description
 * # trelloManagementApp
 *
 * Main module of the application.
 */
angular
  .module('trelloManagementApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $locationProvider) {

    // $locationProvider.html5Mode(true);

    $routeProvider
      .when('!#/', {
        controllerAs: 'root',
        resolve: ['$location', function($location) {
          console.log('alo');
          $location.url('/#!/cusujjo');
        }]
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login',
      })
      .when('/boards', {
        templateUrl: 'views/boards.html',
        controller: 'BoardsCtrl',
        controllerAs: 'boards',

        resolve: {
          'authorize': function(authFactory, $location) {
            if (authFactory.authorized()) {
              return true;
            }
          }
        },
      })

      .when('/boards/:id', {
        templateUrl: 'views/board-lists.html',
        controller: 'BoardListsCtrl',
        controllerAs: 'boards-lists',

        resolve: {
          'authorize': function(authFactory, $location) {
            if (authFactory.authorized()) {
              return true;
            }
          }
        },
      })
      .otherwise('/login');
  })
  .factory('authFactory',function($location) {
    return {
      authorized: function() {
        if (Trello.authorized()) {
          return true;
        } else {
          return $location.path('/login');
        }
      }
    }
  });
