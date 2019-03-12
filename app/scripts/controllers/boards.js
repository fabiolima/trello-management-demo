'use strict';

/**
 * Boards Controller
 * Show all user's boards.
 */
angular.module('trelloManagementApp')
  .controller('BoardsCtrl', ['$scope', '$location', function ($scope, $location) {

    /**
     * Fetch all boards.
     */
    this.$onInit = function() {
      Trello.members.get('/me/boards')
        .then(function(response) {
          $scope.boards = response;
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
