angular.module("paysAdmin").config(['$routeProvider', function (routeProvider) {

    routeProvider.when("/", {
        templateUrl: "pages/categories.html",
        controller: "categoriesCtrl",
        restricted : true
    }).when("/products", {
        templateUrl: "pages/products.html",
        controller: "productsCtrl",
        restricted : true
    }).when("/orders", {
        templateUrl: "pages/orders.html",
        controller: "ordersCtrl",
        restricted : true
    }).when("/reviews", {
        templateUrl: "pages/reviews.html",
        controller: "reviewsCtrl",
        restricted : true
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
        },
        restricted : true
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
        },
        restricted : true
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
        },
        restricted : true
    }).when("/login", {
        templateUrl: "pages/login.html",
        controller: "loginCtrl",
        restricted : false
    }).when("/redirection/token/:token/id/:id/role/:role", {
        templateUrl: "pages/redirect.html",
        controller: "redirectCtrl",
        restricted : false
    }).otherwise({redirectTo: '/login'});
}]);