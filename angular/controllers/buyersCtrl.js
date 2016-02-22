angular.module('paysAdmin').controller("buyersCtrl", ["$scope", "$rootScope", "$filter","buyers","UsersService","Notification",
    function ($scope, $rootScope,$filter,buyers,UsersService,Notification) {

        $scope.buyers = buyers;

        $scope.selectedBuyer = null;

        _generateStatus = function(buyer){
            if (!buyer.isConfirmed) {
                buyer.status = "NOT_CONFIRMED"
            } else {
                if (buyer.isActive) {
                    buyer.status = "ACTIVATED"
                } else {
                    buyer.status = "NOT_ACTIVATED"
                }
            }
        }

        angular.forEach($scope.buyers, function (buyer) {
            _generateStatus(buyer);
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
                _generateStatus($scope.selectedBuyer);
                Notification.success({message: $filter('translate')('BUYER_DEACTIVATED')});
            }).catch(function (err) {
                Notification.error({message: $filter('translate')('BUYER_NOT_DEACTIVATED')});
            });
        }

        $scope.activateBuyer = function () {
            UsersService.activateBuyer($scope.selectedBuyer.id).then(function (data) {
                $scope.selectedBuyer.isActive = true;
                _generateStatus($scope.selectedBuyer);
                Notification.success({message: $filter('translate')('BUYER_ACTIVATED')});
            }).catch(function (err) {
                Notification.error({message: $filter('translate')('BUYER_NOT_ACTIVATED')});
            });
        }


        $scope.sortType    = "privateSubject.name";
        $scope.sortReverse = false;
        $scope.searchWord  = '';
    }]);