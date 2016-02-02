angular.module('paysAdmin').controller("buyersCtrl", ["$scope", "$rootScope", "$filter","buyers","UsersService","Notification",
    function ($scope, $rootScope,$filter,buyers,UsersService,Notification) {

        $scope.buyers = buyers;

        $rootScope.objectPrint($scope.buyers);
        $scope.selectedBuyer = null;

        $scope.selectBuyer = function (buyer) {
            $scope.selectedBuyer = buyer;
        }

        $scope.deactivateBuyer = function () {
            UsersService.deactivateBuyer($scope.selectedBuyer.id).then(function (data) {
                $scope.selectedBuyer.isActive = false;
                Notification.success({message: $filter('translate')('BUYER_DEACTIVATED')});
            }).catch(function (err) {
                Notification.error({message: $filter('translate')('BUYER_NOT_DEACTIVATED')});
            });
        }

        $scope.activateBuyer = function () {
            UsersService.activateBuyer($scope.selectedBuyer.id).then(function (data) {
                $scope.selectedBuyer.isActive = true;
                Notification.success({message: $filter('translate')('BUYER_ACTIVATED')});
            }).catch(function (err) {
                Notification.error({message: $filter('translate')('BUYER_NOT_ACTIVATED')});
            });
        }

        $scope.sortType    = "privateSubject.name";
        $scope.sortReverse = false;
        $scope.searchWord  = '';
    }]);