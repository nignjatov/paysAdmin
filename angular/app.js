'use strict';

// Declare app level module which depends on views, and components
var paysAdmin = angular.module('paysAdmin', ['ngRoute','ngAnimate','ui.bootstrap','ui.tree']).filter('html', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
}).filter('slice', function () {
    return function (arr, start, end) {
        return arr.slice(start, end);
    };
}).config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('myHttpInterceptor');

}]);

paysAdmin.run(function ($rootScope) {
    $rootScope.serverURL = "http://185.23.171.43/PEP/PaysRest/";
    $rootScope.serverImagesURL = "http://185.23.171.43/PaysImages/";

});