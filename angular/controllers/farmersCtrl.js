angular.module('paysAdmin').controller("farmersCtrl", ["$scope", "$rootScope", "$filter", "UsersService", "Notification", "farmers",
  function ($scope, $rootScope, $filter, UsersService, Notification, farmers) {

    $scope.farmers = farmers;

    $scope.selectedFarmer = null;

    $scope.selectFarmer = function (farmer) {
      $scope.selectedFarmer = farmer;
    }

    $scope.deactivateFarmer = function () {
      UsersService.deactivateFarmer($scope.selectedFarmer.id).then(function (data) {
        $scope.selectedFarmer.isActive = false;
        Notification.success({message: $filter('translate')('FARMER_DEACTIVATED')});
      }).catch(function (err) {
        Notification.error({message: $filter('translate')('FARMER_NOT_DEACTIVATED')});
      });
    }

    $scope.activateFarmer = function () {
      UsersService.activateFarmer($scope.selectedFarmer.id).then(function (data) {
        $scope.selectedFarmer.isActive = true;
        Notification.success({message: $filter('translate')('FARMER_ACTIVATED')});
      }).catch(function (err) {
        Notification.error({message: $filter('translate')('FARMER_NOT_ACTIVATED')});
      });
    }

    $scope.sortType    = "businessSubject.name";
    $scope.sortReverse = "false";
    $scope.searchWord  = '';

  }]);