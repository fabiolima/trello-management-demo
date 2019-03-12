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

    $locationProvider.html5Mode(true).hashPrefix('!');
    // $routeProvider

    $routeProvider
      .when('/', {
        controllerAs: 'root',
        resolve: ['$location', function($location) {
          $location.path('/login');
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

        resolve: ['$location', function($location) {
          const authorized = Trello.authorized();
          if (!authorized) { $location.path('/login'); }
        }]
      })

      .when('/boards/:id', {
        templateUrl: 'views/board-lists.html',
        controller: 'BoardListsCtrl',
        controllerAs: 'boards-lists',
      })
      .otherwise('/login');
  });
