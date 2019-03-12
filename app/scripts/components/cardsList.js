'use strict';

/**
 * Topbar Component
 * Displays user info.
 */

function CardsListComponent($scope, $rootScope) {
  const $ctrl = this;

  this.$onInit = async function() {
    const listResponse = await  Trello.lists.get(`${this.listId}`, { cards: 'all' });

    $ctrl.list = listResponse;
    $ctrl.cards = listResponse.cards;

    $scope.$apply();
  }
}

CardsListComponent.$inject = ['$scope', '$rootScope'];

angular.module('trelloManagementApp')
  .component('cardsList', {
    templateUrl: 'scripts/components/cards-list.html',
    controller: CardsListComponent,
    bindings: {
      listId: '@'
    }
  });
