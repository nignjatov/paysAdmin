angular.module('paysAdmin').controller("distributorsCtrl", ["$scope", "$rootScope","$filter","UsersService","Notification",
    function ($scope, $rootScope, $filter,UsersService, Notification) {

        $scope.distributors = [];
        $scope.selectedDistributor = null;
        UsersService.getDistributors().then(function (data){
            $scope.distributors = data;
            angular.forEach($scope.distributors, function(dist){
               dist.isConfirmed = true;
            });
            $rootScope.objectPrint(data);
        })

        $scope.selectDistributor = function (distributor) {
            $scope.selectedDistributor = distributor;
        }

        $scope.deactivateDistributor = function (){
            UsersService.deactivateDistributor($scope.selectedDistributor.id).then(function(data){
                $scope.selectedDistributor.isActive = false;
                Notification.success({message: $filter('translate')('DISTRIBUTOR_DEACTIVATED')});
            }).catch(function (err){
                Notification.error({message: $filter('translate')('DISTRIBUTOR_NOT_DEACTIVATED')});
            });
        }

        $scope.activateDistributor = function (){
            UsersService.activateDistributor($scope.selectedDistributor.id).then(function(data){
                $scope.selectedDistributor.isActive = true;
                Notification.success({message: $filter('translate')('DISTRIBUTOR_ACTIVATED')});
            }).catch(function (err){
                Notification.error({message: $filter('translate')('DISTRIBUTOR_NOT_ACTIVATED')});
            });
        }

        $scope.sortType = "isActive";
        $scope.sortReverse = "false";
        $scope.searchWord   = '';

    }]);