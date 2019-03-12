'use strict';

/**
 * Card Component
 * Displays the card info and action buttons to edit, view and delete.
 */
function CardComponent() {
  const $ctrl = this;

  /**
   * Parse input string data to javascript object.
   */
  $ctrl.$onInit = function() {
    $ctrl.card = JSON.parse(this.data);
  };

  /**
   * Shows the confirm dialog, if the response is true then delete the card.
   * @param {id} the id of card to be deleted.
   */
  $ctrl.delete = function(id) {
    const areYouSure = window.confirm('Are you shure you want delete this card?');

    if (areYouSure) {
      Trello.del('/cards/'+ id).then(function() {
        $ctrl.refresh();
      });
    }
  };
}

CardComponent.$inject = [];

angular.module('trelloManagementApp')
  .component('card', {
    templateUrl: 'scripts/components/card.html',
    controller: CardComponent,
    bindings: {
      data: '@',
      refresh: '&refresh'
    }
  });
