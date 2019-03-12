'use strict';

/**
 * @ngdoc function
 * @name trelloManagementApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the trelloManagementApp
 */
angular.module('trelloManagementApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.login = function() {
      Trello.authorize({
        type: 'popup',
        name: 'Getting Started Application',
        scope: {
          read: 'true',
          write: 'true' },
        expiration: 'never',
        success: this.authenticationSuccess,
        error: this.authenticationFailure
      });
    }

    $scope.authenticationSuccess = function(a,b,c) {
      console.log('success');
      
    }

    $scope.authenticationFailure = function(a,b,c) {
      console.log(a,b,c);
    }

  }]);
