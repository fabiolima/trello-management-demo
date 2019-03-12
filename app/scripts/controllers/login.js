'use strict';

/**
 * LoginCtrl
 * Authenticates the user and redirect to boards page.
 */
angular.module('trelloManagementApp')
  .controller('LoginCtrl', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {

    /**
     * Invokes the authorization Trello's popup.
     * Call the proper callback based on authorize result.
     */
    $scope.login = function() {
      Trello.authorize({
        type: 'popup',
        name: 'Trello Management Demo',
        scope: {
          read: 'true',
          write: 'true' },
        expiration: 'never',
        success: this.authenticationSuccess,
        error: this.authenticationFailure
      });
    }

    /**
     * Retrieve user info.
     * Redirect to boards page.
     */
    $scope.authenticationSuccess = function() {
      Trello.members.get('me')
        .then(function(response) {
          $rootScope.$emit('user.authenticated', response);
          $location.path('/boards');
          $scope.$apply();
        })
    }

    /**
     * Shows an message and stay on the login page.
     */
    $scope.authenticationFailure = function() {
      console.log(a,b,c);
    }

  }]);
