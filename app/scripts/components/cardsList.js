'use strict';

/**
 * Card List Component
 * Display card from a given list.
 */
function CardsListComponent($scope) {

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
   * Initial form data.
   */
  $ctrl.cardForm = {
    name: null,
    due: new Date()
  };

  // ############# METHODS ##############

  /**
   * Load data when init.
   */
  $ctrl.$onInit = function() {
    $ctrl.getCards();
  };

  /**
   * Fetch all cards from list.
   */
  $ctrl.getCards = function() {
    Trello.lists.get(this.listId, { cards: 'all' })
      .then(function(response) {
        $ctrl.list = response;
        $ctrl.cards = response.cards;

        $scope.$apply();
      });
  };

  /**
   * Callback for child components.
   */
  $ctrl.refresh = function() {
    $ctrl.getCards();
  };

  /**
   * Toggle form visibility.
   */
  $ctrl.toggleForm = function() {
    $ctrl.formState.show = !$ctrl.formState.show;
  };

  /**
   * Create card with form values.
   */
  $ctrl.submit = function(cardForm) {

    // Shows loading icon.
    $ctrl.formState.loading = true;

    const params = Object.assign($ctrl.cardForm, { idList: $ctrl.listId });

    Trello.post('/cards', params)
      .then(function(response) {
        $ctrl.toggleForm();
        $ctrl.cards.push(response);
        $ctrl.resetForm(cardForm);
        $ctrl.formState.loading = false;

        $scope.$apply();
      });
  };

  /**
   * Reset native form states.
   * Reset to initial data.
   */
  $ctrl.resetForm = function(cardForm) {
    cardForm.$setPristine();
    $ctrl.cardForm = {
      due: new Date()
    };
  };
}

/**
 * Inject component dependencies.
 */
CardsListComponent.$inject = ['$scope'];

/**
 * Registering card component.
 * @bindings(listId) the list id.
 * @bindings(listName) the list name.
 */
angular.module('trelloManagementApp')
  .component('cardsList', {
    templateUrl: 'views/cards-list.html',
    controller: CardsListComponent,
    bindings: {
      listId: '@',
      listName: '@'
    }
  });
