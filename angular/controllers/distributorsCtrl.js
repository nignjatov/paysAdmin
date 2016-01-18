angular.module('paysAdmin').controller("distributorsCtrl", ["$scope", "$rootScope", "$filter", "UsersService", "Notification","distributors",
  function ($scope, $rootScope, $filter, UsersService, Notification, distributors) {

    $scope.distributors        = distributors;
    $scope.selectedDistributor = null;

    $scope.selectDistributor = function (distributor) {
      $scope.selectedDistributor = distributor;
    }

    $scope.deactivateDistributor = function () {
      UsersService.deactivateDistributor($scope.selectedDistributor.id).then(function (data) {
        $scope.selectedDistributor.isActive = false;
        Notification.success({message: $filter('translate')('DISTRIBUTOR_DEACTIVATED')});
      }).catch(function (err) {
        Notification.error({message: $filter('translate')('DISTRIBUTOR_NOT_DEACTIVATED')});
      });
    }

    $scope.activateDistributor = function () {
      UsersService.activateDistributor($scope.selectedDistributor.id).then(function (data) {
        $scope.selectedDistributor.isActive = true;
        Notification.success({message: $filter('translate')('DISTRIBUTOR_ACTIVATED')});
      }).catch(function (err) {
        Notification.error({message: $filter('translate')('DISTRIBUTOR_NOT_ACTIVATED')});
      });
    }

    $scope.sortType    = "businessSubject.name";
    $scope.sortReverse = "false";
    $scope.searchWord  = '';

  }]);