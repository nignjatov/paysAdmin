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
    }).when("/distributors", {
        templateUrl: "pages/distributors.html",
        controller: "distributorsCtrl",
    }).when("/buyers", {
        templateUrl: "pages/buyers.html",
        controller: "buyersCtrl",
    }).otherwise({redirectTo: '/'});
}]);