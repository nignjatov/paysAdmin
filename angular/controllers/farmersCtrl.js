angular.module('paysAdmin').controller("farmersCtrl", ["$scope", "$rootScope", "$filter", "UsersService", "Notification", "farmers",
  function ($scope, $rootScope, $filter, UsersService, Notification, farmers) {

    $scope.farmers = farmers;

    $scope.selectedFarmer = null;

    _generateStatus = function(farmer){
      if (!farmer.isConfirmed) {
        farmer.status = "NOT_CONFIRMED"
      } else {
        if (farmer.isActive) {
          farmer.status = "ACTIVATED"
        } else {
          farmer.status = "NOT_ACTIVATED"
        }
      }
    }


    angular.forEach($scope.farmers, function (farmer) {
      _generateStatus(farmer);
    });

    $scope.selectFarmer = function (farmer) {
      $scope.selectedFarmer = farmer;
    }

    $scope.goBack = function () {
      $scope.selectedFarmer = null;
    }

    $scope.deactivateFarmer = function () {
      UsersService.deactivateFarmer($scope.selectedFarmer.id).then(function (data) {
        $scope.selectedFarmer.isActive = false;
        _generateStatus($scope.selectedFarmer);
        Notification.success({message: $filter('translate')('FARMER_DEACTIVATED')});
      }).catch(function (err) {
        Notification.error({message: $filter('translate')('FARMER_NOT_DEACTIVATED')});
      });
    }

    $scope.activateFarmer = function () {
      UsersService.activateFarmer($scope.selectedFarmer.id).then(function (data) {
        $scope.selectedFarmer.isActive = true;
        _generateStatus($scope.selectedFarmer);
        Notification.success({message: $filter('translate')('FARMER_ACTIVATED')});
      }).catch(function (err) {
        Notification.error({message: $filter('translate')('FARMER_NOT_ACTIVATED')});
      });
    }

    $scope.sortType    = "businessSubject.name";
    $scope.sortReverse = "false";
    $scope.searchWord  = '';

  }]);