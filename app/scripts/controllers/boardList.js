'use strict';

/**
 * Board Lists Controller
 * Given an board, show all related lists.
 */
angular.module('trelloManagementApp')
  .controller('BoardListsCtrl', ['$scope', '$location', '$rootScope', '$routeParams', function ($scope, $location, $rootScope, $routeParams) {
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

    /**
     * Fetch all boards.
     */
    this.$onInit = async function() {
      const boardsResponse = await Trello.boards.get(`${$routeParams.id}`, { lists: 'all' });

      $scope.lists = boardsResponse.lists;
      $scope.currentBoard = boardsResponse;

      $scope.$apply();
    }
  }]);