'use strict';

/**
 * Boards Controller
 * Show all user's boards.
 */
angular.module('trelloManagementApp')
  .controller('BoardsCtrl', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {

    /**
     * Fetch all boards.
     */
    this.$onInit = function() {
      Trello.members.get('/me/boards')
        .then(function(response) {
          $scope.boards = response;
          $rootScope.$emit('board.selected', null);
          $scope.$apply();
        });
    };

    /**
     * Go to a single board page.
     */
    $scope.go = function(id) {
      $location.url('/board/'+id);
    };
  }]);
