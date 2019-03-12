'use strict';

/**
 * Topbar Component
 * Displays user info.
 */

function TopbarComponent($scope, $rootScope) {
  $rootScope.$on('user.authenticated', function(event, user) {
    $scope.user = user;
  });
}

TopbarComponent.$inject = ['$scope', '$rootScope'];

angular.module('trelloManagementApp')
  .component('topbar', {
    templateUrl: '/scripts/components/topbar.html',
    controller: TopbarComponent
  });
