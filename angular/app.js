'use strict';

// Declare app level module which depends on views, and components
var paysAdmin = angular.module('paysAdmin', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ui.tree', 'ui-notification'
  , 'pascalprecht.translate'])
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
  }).config(function ($translateProvider) {
    $translateProvider.useSanitizeValueStrategy(null);
    $translateProvider.translations('en', {
      'HOME' : 'Home',
      'NAVIGATION' : 'Main navigation',
      'CATEGORIES' : 'Categories',
      'PRODUCTS' : 'Products',
      'ORDERS' : 'Orders',
      'USERS' : 'Users',
      'BUYERS' : 'Buyers',
      'FARMERS' : 'Farmers',
      'DISTRIBUTORS' : 'Distributors',
      'SIGN_OUT' : 'Sign out',
      'ADMIN_APP' : 'Backoffice',
      'ADMIN' : 'Administrator',
      'COPYRIGHT' : 'Copyright',
      'RIGHTS_RESERVED' : 'All rights reserved.',
      'CATEGORIES_DESCRIPTION' : 'Control information about product categories',
      'ADD_CATEGORY': 'Add new category',
      'CATEGORY' : 'Category',
      'CATEGORY_NAME' : 'Category name',
      'ENTER_CATEGORY_NAME' : 'Enter category name',
      'SUBCATEGORY_NUM' : 'Subcategories number',
      'PRODUCTS_NUM' : 'Products number',
      'SAVE' : 'Save'
    })
      .translations('rs', {
        'HOME' : 'Početna',
        'NAVIGATION' : 'Navigacija',
        'CATEGORIES' : 'Kategorije',
        'PRODUCTS' : 'Proizvodi',
        'ORDERS' : 'Narudžbine',
        'USERS' : 'Korisnici',
        'BUYERS' : 'Kupci',
        'FARMERS' : 'Farmeri',
        'DISTRIBUTORS' : 'Distributeri',
        'SIGN_OUT' : "Odjava",
        'ADMIN_APP' : 'Administrator',
        'ADMIN' : 'Administrator',
        'COPYRIGHT' : 'Copyright',
        'RIGHTS_RESERVED' : 'Sva prava zadržana.',
        'CATEGORIES_DESCRIPTION' : 'Upravljajte informacijama o kategorijama',
        'ADD_CATEGORY': 'Dodaj novu kategoriju',
        'CATEGORY' : 'Kategorija',
        'CATEGORY_NAME' : 'Ime kategorije',
        'ENTER_CATEGORY_NAME' : 'Unesite ime kategorije',
        'SUBCATEGORY_NUM' : 'Broj podkategorija',
        'PRODUCTS_NUM' : 'Broj proizvoda',
        'SAVE' : 'Sačuvaj'
      });
    $translateProvider.preferredLanguage('en');
  });

paysAdmin.run(function ($rootScope,$translate) {
  $rootScope.serverURL       = "http://185.23.171.43/PEP/PaysRest/";
  $rootScope.serverImagesURL = "http://185.23.171.43/PaysImages/";

  $rootScope.changeLanguage = function (langCode) {
    console.log("AAA "+ langCode);
    $translate.use(langCode);
  }

});