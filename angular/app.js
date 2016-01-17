'use strict';

// Declare app level module which depends on views, and components
var paysAdmin = angular.module('paysAdmin', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ui.tree', 'ui-notification'
  , 'pascalprecht.translate','angularUtils.directives.dirPagination'])
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
      'SAVE' : 'Save',
      'DISTRIBUTOR' : 'Distributor',
      'DISTRIBUTORS_DESC' : 'Review information about distributors',
      'COMPANY_NAME': 'Company name',
      'CITY' : 'City',
      'E_MAIL': 'E-mail',
      'PHONE' : 'Phone',
      'NOT_ACTIVATED' : 'Not activated',
      'ACTIVATED' : 'Activated',
      'SEARCH_DISTRIBUTORS' : 'Search distributors',
      'NOT_CONFIRMED' : 'Account not confirmed',
      'TAX_NUM': 'Tax number',
      'BUSINESS_ACT_NUM': 'Bussiness activity number',
      'FAX': 'Fax number',
      'BANK_NUMBER': 'Bank account number',
      'PIB_NUMBER': 'Company identification number',
      'ADDRESS' : 'Address',
      'POSTAL_CODE' : 'Postal code',
      'ACTIVATE' : 'Activate',
      'DEACTIVATE' : 'Deactivate',
      'DISTRIBUTOR_ACTIVATED' : 'Distributor activated',
      'DISTRIBUTOR_NOT_ACTIVATED' : 'Distributor not activated',
      'DISTRIBUTOR_DEACTIVATED' : 'Distributor deactivated',
      'DISTRIBUTOR_NOT_DEACTIVATED' : 'Distributor not deactivated',
      'CATEGORY_CREATED' : 'Category created',
      'CATEGORY_DELETED' : 'Category deleted',
      'CATEGORY_UPDATED' : 'Category updated',
      'CATEGORY_NOT_CREATED' : 'Failed to create category',
      'CATEGORY_NOT_DELETED' : 'Failed to delete category',
      'CATEGORY_NOT_UPDATED' : 'Failed to update category',
      'FARMERS_DESC' : 'Review information about farmers',
      'SEARCH_FARMERS' : 'Search farmers',
      'FARMER_ACTIVATED' : 'Farmer activated',
      'FARMER_NOT_ACTIVATED' : 'Farmer not activated',
      'FARMER_DEACTIVATED' : 'Farmer deactivated',
      'FARMER_NOT_DEACTIVATED' : 'Farmer not deactivated',
      'FARMER': 'Farmer'

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
        'SAVE' : 'Sačuvaj',
        'DISTRIBUTOR' : 'Distributer',
        'DISTRIBUTORS_DESC' : 'Pregled informacija o distributerima',
        'COMPANY_NAME': 'Ime kompanije',
        'CITY' : 'Grad',
        'E_MAIL': 'E-mail adresa',
        'PHONE' : 'Telefon',
        'NOT_ACTIVATED' : 'Nisu aktivirani',
        'ACTIVATED' : 'Aktivirani',
        'SEARCH_DISTRIBUTORS' : 'Pretražite distributere',
        'NOT_CONFIRMED' : 'Nalog nije potvrđen',
        'TAX_NUM': 'Poreski broj',
        'BUSINESS_ACT_NUM': 'Broj preduzetnika',
        'FAX': 'Fax broj',
        'BANK_NUMBER': 'Žiro račun',
        'PIB_NUMBER': 'PIB',
        'ADDRESS' : 'Adresa',
        'POSTAL_CODE' : 'Poštanski broj',
        'ACTIVATE' : 'Aktiviraj',
        'DEACTIVATE' : 'Deaktiviraj',
        'DISTRIBUTOR_ACTIVATED' : 'Distributer aktiviran',
        'DISTRIBUTOR_NOT_ACTIVATED' : 'Distributer nije aktiviran',
        'DISTRIBUTOR_DEACTIVATED' : 'Distributer deaktiviran',
        'DISTRIBUTOR_NOT_DEACTIVATED' : 'Distributer nije deaktiviran',
        'CATEGORY_CREATED' : 'Kategorija kreirana',
        'CATEGORY_DELETED' : 'Kategorija izbrisana',
        'CATEGORY_UPDATED' : 'Kategorija ažurirana',
        'CATEGORY_NOT_CREATED' : 'Neuspešno kreiranje kategorije',
        'CATEGORY_NOT_DELETED' : 'Neuspešno brisanje kategorije',
        'CATEGORY_NOT_UPDATED' : 'Neuspešno ažuriranje kategorije',
        'FARMERS_DESC' : 'Pregled informacija o farmerima',
        'SEARCH_FARMERS' : 'Pretražite farmere',
        'FARMER_ACTIVATED' : 'Distributer aktiviran',
        'FARMER_NOT_ACTIVATED' : 'Distributer nije aktiviran',
        'FARMER_DEACTIVATED' : 'Distributer deaktiviran',
        'FARMER_NOT_DEACTIVATED' : 'Distributer nije deaktiviran',
        'FARMER': 'Farmer'
      });
    $translateProvider.preferredLanguage('en');
  });

paysAdmin.run(function ($rootScope,$translate) {
  $rootScope.serverURL       = "http://185.23.171.43/PEP/PaysRest/";
  $rootScope.serverImagesURL = "http://185.23.171.43/PaysImages/";

  $rootScope.maxItemsPerPage = 30;
  $rootScope.changeLanguage = function (langCode) {
    $translate.use(langCode);
  };

  $rootScope.objectPrint = function(obj){
    console.log(JSON.stringify(obj,null,4));
  }

});