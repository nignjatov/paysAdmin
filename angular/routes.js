angular.module("paysAdmin").config(['$routeProvider', function (routeProvider) {

    routeProvider.when("/", {
        templateUrl: "pages/categories.html",
        resolve: {}
    }).when("/products", {
        templateUrl: "pages/products.html",
        resolve: {}
    }).when("/orders", {
        templateUrl: "pages/orders.html",
        resolve: {}
    }).when("/farmers", {
        templateUrl: "pages/farmers.html",
        resolve: {}
    }).when("/distributors", {
        templateUrl: "pages/distributors.html",
        resolve: {}
    }).when("/buyers", {
        templateUrl: "pages/buyers.html",
        resolve: {}
    }).otherwise({redirectTo: '/'});
}]);