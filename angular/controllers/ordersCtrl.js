angular.module('paysAdmin').controller("ordersCtrl", ["$scope", "$rootScope", "OrdersService", "UsersService",
  function ($scope, $rootScope, OrdersService, UsersService) {
    //Load and merge data
    $scope.selectedOrder = null;
    $scope.orders        = null;

    $scope.loading = true;


    OrdersService.getOrders().then(function (orderData) {
      UsersService.getBuyers().then(function (buyerData) {
        UsersService.getFarmers().then(function (farmerData) {
          angular.forEach(orderData, function (order) {
            order.numericStatus = $rootScope.getNumericOrderStatus(order.status);
            order.acceptedPrice = parseFloat(0);
            if (order.status == 'D' || order.status == 'P') {
              order.acceptedPrice = parseFloat(0);
              order.acceptedItems = [];
              order.rejectedItems = [];
              angular.forEach(order.items, function (item) {
                if (item.status == "A") {
                  order.acceptedItems.push(item);
                  order.acceptedPrice += parseFloat(item.totalItemPrice);
                } else if (item.status == "R") {
                  order.rejectedItems.push(item);
                }
              });
            }
            angular.forEach(buyerData, function (buyer) {
              if (!order.buyerData) {
                if (buyer.id === order.orderedBy) {
                  order.buyerData = buyer;
                }
              }
            });
            angular.forEach(farmerData, function (farmer) {
              if (!order.farmerData) {
                if (farmer.id === order.orderedFrom) {
                  order.farmerData = farmer;
                }
              }
            });
          })
        });
      });
      $scope.orders  = orderData;
      $scope.loading = false;
    });


    $scope.selectOrder = function (order) {
      $scope.selectedOrder = order;
    };

    $scope.goBack      = function () {
      $scope.selectedOrder = null;
    }
    $scope.sortType    = "id";
    $scope.sortReverse = false;
    $scope.searchWord  = '';
  }])
;