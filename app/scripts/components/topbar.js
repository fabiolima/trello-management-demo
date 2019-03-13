'use strict';

/**
 * Topbar Component
 * Displays user info.
 */
function TopbarComponent($scope, $rootScope) {

  /**
   * Local "$scope".
   */
  const $ctrl = this;

  /**
   * Logged User.
   */
  $ctrl.user = null;

  /**
   * Selected board
   */
  $ctrl.board = null;

  /**
   * Display user name after authentication event.
   */
  $rootScope.$on('user.authenticated', function(event, user) {
    $ctrl.user = user;
    $scope.$apply();
  });

  /**
   * Display board name after selected event.
   */
  $rootScope.$on('board.selected', function(event, board) {
    $ctrl.board = board;
    $scope.$apply();
  });
}

/**
 * Inject component dependencies.
 */
TopbarComponent.$inject = ['$scope', '$rootScope'];

/**
 * Registering topbar component.
 */
angular.module('trelloManagementApp')
  .component('topbar', {
    templateUrl: 'views/topbar.html',
    controller: TopbarComponent
  });
