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
    this.$onInit = async function() {
      const boards = await Trello.members.get('/me/boards');

      $scope.boards = boards;
      $scope.$apply();
    }

    /**
     * Go to a single board page.
     */
    $scope.go = function(id) {
      $location.url('/board/'+id);
    }
  }]);
