angular.module('paysAdmin').controller("buyersCtrl", ["$scope", "$rootScope","buyers",
    function ($scope, $rootScope,buyers) {

        $scope.buyers = buyers;

        $rootScope.objectPrint($scope.buyers);
        $scope.selectedBuyer = null;

        $scope.selectBuyer = function (buyer) {
            $scope.selectedBuyer = buyer;
        }

        $scope.sortType    = "businessSubject.name";
        $scope.sortReverse = "false";
        $scope.searchWord  = '';
    }]);