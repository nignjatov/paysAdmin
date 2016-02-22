angular.module('paysAdmin').controller("distributorsCtrl", ["$scope", "$rootScope", "$filter", "UsersService", "Notification", "distributors",
  function ($scope, $rootScope, $filter, UsersService, Notification, distributors) {

    $scope.distributors        = distributors;
    $scope.selectedDistributor = null;

    _generateStatus = function(distributor){
      if (!distributor.isConfirmed) {
        distributor.status = "NOT_CONFIRMED"
      } else {
        if (distributor.isActive) {
          distributor.status = "ACTIVATED"
        } else {
          distributor.status = "NOT_ACTIVATED"
        }
      }
    }

    angular.forEach($scope.distributors, function (distributor) {
      _generateStatus(distributor);
    });
    $scope.selectDistributor   = function (distributor) {
      $scope.selectedDistributor = distributor;
    }

    $scope.goBack                = function () {
      $scope.selectedDistributor = null;
    }
    $scope.deactivateDistributor = function () {
      UsersService.deactivateDistributor($scope.selectedDistributor.id).then(function (data) {
        $scope.selectedDistributor.isActive = false;
        _generateStatus($scope.selectedDistributor);
        Notification.success({message: $filter('translate')('DISTRIBUTOR_DEACTIVATED')});
      }).catch(function (err) {
        Notification.error({message: $filter('translate')('DISTRIBUTOR_NOT_DEACTIVATED')});
      });
    }

    $scope.activateDistributor = function () {
      UsersService.activateDistributor($scope.selectedDistributor.id).then(function (data) {
        $scope.selectedDistributor.isActive = true;
        _generateStatus($scope.selectedDistributor);
        Notification.success({message: $filter('translate')('DISTRIBUTOR_ACTIVATED')});
      }).catch(function (err) {
        Notification.error({message: $filter('translate')('DISTRIBUTOR_NOT_ACTIVATED')});
      });
    }


    $scope.sortType    = "businessSubject.name";
    $scope.sortReverse = "false";
    $scope.searchWord  = '';

  }]);