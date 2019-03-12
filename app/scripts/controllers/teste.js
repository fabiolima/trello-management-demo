'use strict';

/**
 * Board Lists Controller
 * Given an board, show all related lists.
 */
angular.module('trelloManagementApp')
  .controller('TesteCtrl', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {

    /**
     * alert
     */
    this.$onInit = async function() {
      const boards = await Trello.members.get('/me/boards');

      $scope.boards = boards;
      $scope.$apply();
    }
  }]);