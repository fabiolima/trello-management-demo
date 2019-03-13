'use strict';

/**
 * Card Component
 * Displays the card info and action buttons to edit, view and delete.
 */
function CardComponent($scope, $rootScope) {

  /**
   * Local "$scope".
   */
  const $ctrl = this;

  /**
   * Form state to manage user interatcions.
   */
  $ctrl.formState = {
    show: false,
    loading: false,
  };

  /**
   * The card form, will be filled with current card attributes.
   */
  $ctrl.cardForm = {};

  // ############# METHODS ##############

  /**
   * Parse input string data to javascript object.
   * Fill $ctrl.cardForm with initial values.
   */
  $ctrl.$onInit = function() {
    $ctrl.card = JSON.parse(this.data);
    $ctrl.cardForm = {
      name: $ctrl.card.name,
      due: new Date($ctrl.card.badges.due)
    };
  };

  /**
   * Toggle form visibility.
   */
  $ctrl.toggleForm = function() {
    $ctrl.formState.show = !$ctrl.formState.show;
  };

  /**
   * Update card with new values.
   */
  $ctrl.submit = function() {

    // Shows loading icon.
    $ctrl.formState.loading = true;

    const params = Object.assign($ctrl.cardForm, { idList: $ctrl.listId });

    Trello.put('/cards/' + $ctrl.card.id, params)
      .then(function(response) {
        $ctrl.toggleForm();
        $ctrl.card = response;
        $ctrl.formState.loading = false;

        $scope.$apply();
      });
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

  /**
   * Emit modal open event.
   */
  $ctrl.showDetails = function() {
    $rootScope.$emit('modal.open', $ctrl.card);
  }
}

/**
 * Inject component dependencies.
 */
CardComponent.$inject = ['$scope', '$rootScope'];


/**
 * Registering card component.
 * @bindings(data) the card data.
 * @bindings(refresh) the refresh callback from parent.
 */
angular.module('trelloManagementApp')
  .component('card', {
    templateUrl: 'views/card.html',
    controller: CardComponent,
    bindings: {
      data: '@',
      refresh: '&refresh'
    }
  });
