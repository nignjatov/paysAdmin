angular.module('paysAdmin').controller("buyersCtrl", ["$scope", "$rootScope", "$filter","buyers","UsersService","Notification",
    function ($scope, $rootScope,$filter,buyers,UsersService,Notification) {

        $scope.buyers = buyers;

        $scope.selectedBuyer = null;

        angular.forEach($scope.buyers, function (buyer) {
            if (!buyer.isConfirmed) {
                buyer.status = "NOT_CONFIRMED"
            } else {
                if (buyer.isActive) {
                    buyer.status = "ACTIVATED"
                } else {
                    buyer.status = "NOT_ACTIVATED"
                }
            }
        });

        $scope.selectBuyer = function (buyer) {
            $scope.selectedBuyer = buyer;
        }

        $scope.goBack = function () {
            $scope.selectedBuyer = null;
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