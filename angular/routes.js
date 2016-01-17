angular.module("paysAdmin").config(['$routeProvider', function (routeProvider) {

    routeProvider.when("/", {
        templateUrl: "pages/categories.html",
        controller: "categoriesCtrl",
    }).when("/products", {
        templateUrl: "pages/products.html",
        controller: "productsCtrl",
    }).when("/orders", {
        templateUrl: "pages/orders.html",
        controller: "ordersCtrl",
    }).when("/farmers", {
        templateUrl: "pages/farmers.html",
        controller: "farmersCtrl",
        resolve: {
            farmers: function (UsersService) {
                return UsersService.getFarmers()
                  .then(function (data) {
                      return data;
                  })
            }
        }
    }).when("/distributors", {
        templateUrl: "pages/distributors.html",
        controller: "distributorsCtrl",
        resolve: {
            distributors: function (UsersService) {
                return UsersService.getDistributors()
                  .then(function (data) {
                      return data;
                  })
            }
        }
    }).when("/buyers", {
        templateUrl: "pages/buyers.html",
        controller: "buyersCtrl",
        resolve: {
            buyers: function (UsersService) {
                return UsersService.getBuyers()
                  .then(function (data) {
                      return data;
                  })
            }
        }
    }).otherwise({redirectTo: '/'});
}]);