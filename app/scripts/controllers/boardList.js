'use strict';

/**
 * Board Lists Controller
 * Given an board, show all related lists.
 */
angular.module('trelloManagementApp')
  .controller('BoardListsCtrl', ['$scope', '$location', '$rootScope', '$routeParams', function ($scope, $location, $rootScope, $routeParams) {

    /**
     * Fetch all board lists.
     */
    this.$onInit = function() {
      Trello.boards.get($routeParams.id, { lists: 'all' })
        .then(function(response) {
          $rootScope.$emit('board.selected', response);
          $scope.currentBoard = response;
          $scope.lists = response.lists;
          $scope.$apply();
        });
    };
  }]);