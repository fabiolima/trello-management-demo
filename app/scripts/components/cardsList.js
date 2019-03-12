'use strict';

/**
 * Topbar Component
 * Displays user info.
 */

function CardsListComponent($scope) {
  const $ctrl = this;

  $ctrl.showForm = false;

  $ctrl.cardForm = {
    name: null,
    due: new Date()
  };

  $ctrl.$onInit = function() {
    $ctrl.getCards();
  };

  $ctrl.getCards = function() {
    Trello.lists.get(this.listId, { cards: 'all' })
      .then(function(response) {
        $ctrl.list = response;
        $ctrl.cards = response.cards;
        $scope.$apply();
      });
  };

  $ctrl.refresh = function() {
    $ctrl.getCards();
  };

  $ctrl.toggleForm = function() {
    $ctrl.showForm = !$ctrl.showForm;
  };

  $ctrl.submit = function(cardForm) {

    const params = Object.assign($ctrl.cardForm, { idList: $ctrl.listId });
    
    Trello.post('/cards', params)
      .then(function(response) {
        $ctrl.toggleForm();
        $ctrl.cards.push(response);
        $ctrl.resetForm(cardForm);

        $scope.$apply();
      });
  };

  $ctrl.resetForm = function(cardForm) {
    cardForm.$setPristine();
    $ctrl.cardForm = {
      due: new Date()
    };
  };
}

CardsListComponent.$inject = ['$scope'];

angular.module('trelloManagementApp')
  .component('cardsList', {
    templateUrl: 'scripts/components/cards-list.html',
    controller: CardsListComponent,
    bindings: {
      listId: '@',
      listName: '@'
    }
  });
