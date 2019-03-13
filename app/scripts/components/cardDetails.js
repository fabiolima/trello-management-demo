'use strict';

/**
 * Card Details Component
 * Displays a modal with the card details.
 */
function CardDetailsComponent($scope, $rootScope) {

  /**
   * Local "$scope".
   */
  const $ctrl = this;

  /**
   * Card to be displayed.
   */
  $ctrl.card = null;

  /**
   * Open modal and show card details.
   */
  $rootScope.$on('modal.open', function(event, card) {
    $ctrl.card = card;

    angular.element('#card-details').modal('show');

    // Get all members of this card.
    Trello.get('/cards/' + $ctrl.card.id + '/members')
      .then(function(response) {
        $ctrl.card.members = response.map(function(m) { return m.username; }).join(', ');
        $scope.$apply();
      });

    // Get all action type comments of this card.
    Trello.get('/cards/' + $ctrl.card.id + '/actions')
      .then(function(response) {
        const comments = response.filter(function(action) { return action.type === "commentCard"; });
        $ctrl.card.comments = comments;
        $scope.$apply();
      });
  });
}

/**
 * Inject component dependencies.
 */
CardDetailsComponent.$inject = ['$scope', '$rootScope'];

/**
 * Registering card details component.
 */
angular.module('trelloManagementApp')
  .component('cardDetails', {
    templateUrl: 'views/card-details.html',
    controller: CardDetailsComponent
  });
