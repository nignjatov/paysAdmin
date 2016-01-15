'use strict';

// Declare app level module which depends on views, and components
var paysAdmin = angular.module('paysAdmin', ['ngRoute','ngAnimate','ui.bootstrap','ui.tree','ui-notification'])
  .filter('html', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
}).filter('slice', function () {
    return function (arr, start, end) {
        return arr.slice(start, end);
    };
}).config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('myHttpInterceptor');

}]).config(function (NotificationProvider) {
    NotificationProvider.setOptions({
      delay: 5000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'center',
      positionY: 'top'
    });
  });

paysAdmin.run(function ($rootScope) {
    $rootScope.serverURL = "http://185.23.171.43/PEP/PaysRest/";
    $rootScope.serverImagesURL = "http://185.23.171.43/PaysImages/";

});