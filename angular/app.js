'use strict';

// Declare app level module which depends on views, and components
var paysAdmin = angular.module('paysAdmin', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ui.tree', 'ui-notification'
  , 'pascalprecht.translate', 'angularUtils.directives.dirPagination', 'LocalStorageModule','flow'])
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
  }).config(['flowFactoryProvider', function (flowFactoryProvider) {
    flowFactoryProvider.defaults = {
      target: 'upload.php',
      permanentErrors: [404, 500, 501],
      maxChunkRetries: 1,
      chunkRetryInterval: 5000,
      simultaneousUploads: 4,
      singleFile: true
    };
    flowFactoryProvider.on('catchAll', function (event) {
      console.log('catchAll', arguments);
    });
    // Can be used with different implementations of Flow.js
    // flowFactoryProvider.factory = fustyFlowFactory;
  }]).config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('paysAdmin');
  }).config(function ($translateProvider) {
    $translateProvider.useSanitizeValueStrategy(null);
    $translateProvider.translations('en_EN', {
      'HOME': 'Home',
      'NAVIGATION': 'Main navigation',
      'CATEGORIES': 'Categories',
      'PRODUCTS': 'Products',
      'ORDERS': 'Orders',
      'USERS': 'Users',
      'BUYERS': 'Buyers',
      'FARMERS': 'Farmers',
      'DISTRIBUTORS': 'Distributors',
      'SIGN_OUT': 'Sign out',
      'ADMIN_APP': 'Backoffice',
      'ADMIN': 'Administrator',
      'COPYRIGHT': 'Copyright',
      'RIGHTS_RESERVED': 'All rights reserved.',
      'CATEGORIES_DESCRIPTION': 'Control information about product categories',
      'ADD_CATEGORY': 'Add new category',
      'CATEGORY': 'Category',
      'CATEGORY_NAME_ENGLISH': 'Category name( english )',
      'CATEGORY_NAME_SERBIAN': 'Category name( serbian )',
      'ENTER_CATEGORY_NAME': 'Enter category name',
      'SUBCATEGORY_NUM': 'Subcategories number',
      'PRODUCTS_NUM': 'Products number',
      'SAVE': 'Save',
      'DISTRIBUTOR': 'Distributor',
      'DISTRIBUTORS_DESC': 'Review information about distributors',
      'COMPANY_NAME': 'Company name',
      'CITY': 'City',
      'E_MAIL': 'E-mail',
      'PHONE': 'Phone',
      'NOT_ACTIVATED': 'Not activated',
      'ACTIVATED': 'Activated',
      'SEARCH_DISTRIBUTORS': 'Search distributors',
      'NOT_CONFIRMED': 'Account not confirmed',
      'TAX_NUM': 'Tax number',
      'BUSINESS_ACT_NUM': 'Bussiness activity number',
      'FAX': 'Fax number',
      'BANK_NUMBER': 'Bank account number',
      'PIB_NUMBER': 'Company identification number',
      'ADDRESS': 'Address',
      'POSTAL_CODE': 'Postal code',
      'ACTIVATE': 'Activate',
      'DEACTIVATE': 'Deactivate',
      'DISTRIBUTOR_ACTIVATED': 'Distributor activated',
      'DISTRIBUTOR_NOT_ACTIVATED': 'Distributor not activated',
      'DISTRIBUTOR_DEACTIVATED': 'Distributor deactivated',
      'DISTRIBUTOR_NOT_DEACTIVATED': 'Distributor not deactivated',
      'CATEGORY_CREATED': 'Category created',
      'CATEGORY_DELETED': 'Category deleted',
      'CATEGORY_UPDATED': 'Category updated',
      'CATEGORY_NOT_CREATED': 'Failed to create category',
      'CATEGORY_NOT_DELETED': 'Failed to delete category',
      'CATEGORY_NOT_UPDATED': 'Failed to update category',
      'FARMERS_DESC': 'Review information about farmers',
      'SEARCH_FARMERS': 'Search farmers',
      'FARMER_ACTIVATED': 'Farmer activated',
      'FARMER_NOT_ACTIVATED': 'Farmer not activated',
      'FARMER_DEACTIVATED': 'Farmer deactivated',
      'FARMER_NOT_DEACTIVATED': 'Farmer not deactivated',
      'FARMER': 'Farmer',
      'BUYERS_DESC': 'Review information about buyers',
      'SEARCH_BUYERS': 'Search buyers',
      'CONFIRMED_ACCOUNT': 'Confirmed',
      'LAST_NAME': 'Surname',
      'NAME': 'Name',
      'BUYER': 'Buyer',
      'WELCOME': 'Welcome to PAYS administrator application',
      'LOGIN': 'Log in',
      'PRODUCTS_DESC': 'Control information about products',
      'PRODUCT': 'Product',
      'SEARCH_PRODUCTS': 'Search products',
      'PRODUCT_NAME_ENGLISH': 'Product name ( english )',
      'PRODUCT_NAME_SERBIAN': 'Product name ( serbian )',
      'ENTER_PRODUCT_NAME': 'Enter product name',
      'SHORT_DESC': 'Short description ( 128 characters )',
      'PRODUCT_SHORT_DESC_ENGLISH': 'Product short description ( english )',
      'PRODUCT_SHORT_DESC_SERBIAN': 'Product short description ( serbian )',
      'ENTER_PRODUCT_SHORT_DESC': 'Enter product short description',
      'FULL_DESC': 'Full description ( 512 characters )',
      'PRODUCT_FULL_DESC_ENGLISH': 'Product full description ( english )',
      'PRODUCT_FULL_DESC_SERBIAN': 'Product full description ( serbian )',
      'ENTER_PRODUCT_FULL_DESC': 'Enter product full description',
      'DELETE' : 'Delete',
      'ADD_PRODUCT' : 'Add new product',
      'PRODUCT_NOT_UPDATED' : 'Failed to update product',
      'PRODUCT_UPDATED' : 'Product updated',
      'PRODUCT_NOT_CREATED' : 'Failed to create product',
      'PRODUCT_CREATED' : 'Product created',
      'PRODUCT_NOT_DELETED' : 'Failed to delete product',
      'PRODUCT_DELETED' : 'Product deleted',
      'CURRENT_CATEGORY' : 'Current category',
      'CHANGE_CATEGORY_TO' : 'Change category to',
      'SUBCATEGORY' : 'Subcategory',
      'ORDER_DESC' : "Review orders in PAYS System",
      'SEARCH_ORDERS' : 'Search orders',
      'BUYER_NAME' : 'Buyer name',
      'FARMER_NAME' : 'Farmer name',
      'TRANSPORTER_NAME' : 'Distributor name',
      'PRICE' : 'Price',
      'STATUS' : 'Status',
      'ORDER' : 'Order',
      'BUYER_INFO' : 'Buyer information',
      'FARMER_INFO' : 'Farmer information',
      'DISTRIBUTOR_INFO' :'Distributor information',
      'DELIVERY_DATE' : 'Delivery date',
      'DELIVERY_TIME' : 'Delivery time',
      'PRODUCTS_NUMBER' : "Number of products",
      'IMAGE' : 'Image',
      'HOUSE_NUMBER' : 'Number',
      'FLOOR' : 'Floor',
      'APARTMENT_NUMBER' : 'Apartment number',
      'SELECT_IMAGE' : 'Select image',
      'UPDATE' : 'Change image',
      'UPLOAD' : 'Upload',
      'PRODUCT_IMAGE_UPLOADED' : 'Product image uploaded',
      'PRODUCT_IMAGE_FAILURE' : 'Product image upload failed!',
      'BUYER_NOT_DEACTIVATED' : 'Failed to deactivate buyer!',
      'BUYER_DEACTIVATED' : 'Buyer deactivated',
      'BUYER_NOT_ACTIVATED' : 'Failed to activate buyer',
      'BUYER_ACTIVATED' : 'Buyer activated',
      'BACK' : 'Back',
      'SUBCATEGORY_NAME_ENGLISH': 'Subcategory name( english )',
      'SUBCATEGORY_NAME_SERBIAN': 'Subcategory name( serbian )',
      'ENTER_SUBCATEGORY_NAME': 'Enter subcategory name',
      'NUMBER' : 'number',
      'REVIEWS' : 'Reviews',
      'REVIEWS_DESC' : 'Overview and handling of reviews',
      'SEARCH_REVIEWS' : 'Search reviews',
      'RATING' : 'Rating',
      'POSTED_ON' : 'Posted on',
      'WAITING' : 'Waiting',
      'APPROVED' : 'Approved',
      'REJECTED' : 'Rejected',
      'REVIEW' : 'Review',
      'COMMENT' : 'Comment',
      'REJECT' : 'Reject',
      'APPROVE' : 'Approve',
      'REVIEW_NOT_APPROVED' : 'Failed to approved review',
      'REVIEW_APPROVED' : 'Review approved',
      'REVIEW_NOT_REJECTED' : 'Failed to reject review',
      'REVIEW_REJECTED' : 'Review rejected',
      'MEASUREMENT_UNIT' : 'Measurement unit',
      'AVERAGE_WEIGHT' : 'Average weight per measurement unit',
      'ENTER_AVERAGE_WEIGHT' : 'Enter average weight per measurement unit',
      'TAX_RATE' : 'Tax rate',
      'ENTER_TAX_RATE' : 'Enter tax rate',
      'LOADING' : 'Loading...'

    })
      .translations('rs_RS', {
        'HOME': 'Početna',
        'NAVIGATION': 'Navigacija',
        'CATEGORIES': 'Kategorije',
        'PRODUCTS': 'Proizvodi',
        'ORDERS': 'Narudžbine',
        'USERS': 'Korisnici',
        'BUYERS': 'Kupci',
        'FARMERS': 'Farmeri',
        'DISTRIBUTORS': 'Distributeri',
        'SIGN_OUT': "Odjava",
        'ADMIN_APP': 'Administrator',
        'ADMIN': 'Administrator',
        'COPYRIGHT': 'Copyright',
        'RIGHTS_RESERVED': 'Sva prava zadržana.',
        'CATEGORIES_DESCRIPTION': 'Upravljajte informacijama o kategorijama',
        'ADD_CATEGORY': 'Dodaj novu kategoriju',
        'CATEGORY': 'Kategorija',
        'CATEGORY_NAME_ENGLISH': 'Ime kategorije( engleski )',
        'CATEGORY_NAME_SERBIAN': 'Ime kategorije( srpski )',
        'ENTER_CATEGORY_NAME': 'Unesite ime kategorije',
        'SUBCATEGORY_NUM': 'Broj podkategorija',
        'PRODUCTS_NUM': 'Broj proizvoda',
        'SAVE': 'Sačuvaj',
        'DISTRIBUTOR': 'Distributer',
        'DISTRIBUTORS_DESC': 'Pregled informacija o distributerima',
        'COMPANY_NAME': 'Ime kompanije',
        'CITY': 'Grad',
        'E_MAIL': 'E-mail adresa',
        'PHONE': 'Telefon',
        'NOT_ACTIVATED': 'Nije aktiviran',
        'ACTIVATED': 'Aktiviran',
        'SEARCH_DISTRIBUTORS': 'Pretražite distributere',
        'NOT_CONFIRMED': 'Nalog nije potvrđen',
        'TAX_NUM': 'Poreski broj',
        'BUSINESS_ACT_NUM': 'Broj preduzetnika',
        'FAX': 'Fax broj',
        'BANK_NUMBER': 'Žiro račun',
        'PIB_NUMBER': 'PIB',
        'ADDRESS': 'Adresa',
        'POSTAL_CODE': 'Poštanski broj',
        'ACTIVATE': 'Aktiviraj',
        'DEACTIVATE': 'Deaktiviraj',
        'DISTRIBUTOR_ACTIVATED': 'Distributer aktiviran',
        'DISTRIBUTOR_NOT_ACTIVATED': 'Distributer nije aktiviran',
        'DISTRIBUTOR_DEACTIVATED': 'Distributer deaktiviran',
        'DISTRIBUTOR_NOT_DEACTIVATED': 'Distributer nije deaktiviran',
        'CATEGORY_CREATED': 'Kategorija kreirana',
        'CATEGORY_DELETED': 'Kategorija izbrisana',
        'CATEGORY_UPDATED': 'Kategorija ažurirana',
        'CATEGORY_NOT_CREATED': 'Neuspešno kreiranje kategorije',
        'CATEGORY_NOT_DELETED': 'Neuspešno brisanje kategorije',
        'CATEGORY_NOT_UPDATED': 'Neuspešno ažuriranje kategorije',
        'FARMERS_DESC': 'Pregled informacija o farmerima',
        'SEARCH_FARMERS': 'Pretražite farmere',
        'FARMER_ACTIVATED': 'Distributer aktiviran',
        'FARMER_NOT_ACTIVATED': 'Distributer nije aktiviran',
        'FARMER_DEACTIVATED': 'Distributer deaktiviran',
        'FARMER_NOT_DEACTIVATED': 'Distributer nije deaktiviran',
        'FARMER': 'Farmer',
        'BUYERS_DESC': 'Pregled informacija o kupcima',
        'SEARCH_BUYERS': 'Pretraži kupce',
        'CONFIRMED_ACCOUNT': 'Nalog potvrđen',
        'LAST_NAME': 'Prezime',
        'NAME': 'Ime',
        'BUYER': 'Kupac',
        'WELCOME': 'Dobrodošli u administratorsku aplikaciju PAYS sistema',
        'LOGIN': 'Prijava',
        'PRODUCTS_DESC': 'Upravljajte informacijama o proizvodima',
        'PRODUCT': 'Proizvod',
        'SEARCH_PRODUCTS': 'Pretražite proizvode',
        'PRODUCT_NAME_ENGLISH': 'Ime proizvoda ( engleski )',
        'PRODUCT_NAME_SERBIAN': 'Ime proizvoda ( srpski )',
        'ENTER_PRODUCT_NAME': 'Unesite ime proizvoda',
        'SHORT_DESC': 'Kratak opis ( 128 karaktera )',
        'PRODUCT_SHORT_DESC_ENGLISH': 'Kratak opis proizvoda ( engleski )',
        'PRODUCT_SHORT_DESC_SERBIAN': 'Kratak opis proizvoda ( srpski )',
        'ENTER_PRODUCT_SHORT_DESC': 'Unesite kratac opis proizvoda',
        'FULL_DESC': 'Pun opis ( 512 karaktera )',
        'PRODUCT_FULL_DESC_ENGLISH': 'Pun opis proizvoda ( engleski )',
        'PRODUCT_FULL_DESC_SERBIAN': 'Pun opis proizvoda ( srpski )',
        'ENTER_PRODUCT_FULL_DESC': 'Unesite pun opis proizvoda',
        'DELETE' : 'Obriši',
        'ADD_PRODUCT' : 'Dodaj novi proizvod',
        'PRODUCT_NOT_UPDATED' : 'Neuspešno ažuriranje proizvoda',
        'PRODUCT_UPDATED' : 'Proizvod ažuriran',
        'PRODUCT_NOT_CREATED' : 'Neuspešno kreiranje proizvoda',
        'PRODUCT_CREATED' : 'Proizvod kreiran',
        'PRODUCT_NOT_DELETED' : 'Neuspešno brisanje proizvoda',
        'PRODUCT_DELETED' : 'Proizvod obrisan',
        'CURRENT_CATEGORY' : 'Trenutna kategorija',
        'CHANGE_CATEGORY_TO' : 'Prebaci u kategoriju',
        'SUBCATEGORY' : 'Podkategorija',
        'ORDER_DESC' : "Pregled informacija o narudžbinama",
        'SEARCH_ORDERS' : 'Pretražite narudžbine',
        'BUYER_NAME' : 'Ime kupca',
        'FARMER_NAME' : 'Ime farmera',
        'TRANSPORTER_NAME' : 'Ime distributera',
        'PRICE' : 'Cena',
        'STATUS' : 'Status',
        'ORDER' : 'Narudžbina',
        'BUYER_INFO' : 'Informacije o kupcu',
        'FARMER_INFO' : 'Informacije o farmeru',
        'DISTRIBUTOR_INFO' :'Informacije o distributeru',
        'DELIVERY_DATE' : 'Datum dostave',
        'DELIVERY_TIME' : 'Vreme dostave',
        'PRODUCTS_NUMBER' : "Broj proizvoda",
        'IMAGE' : 'Slika',
        'HOUSE_NUMBER' : 'Broj',
        'FLOOR' : 'Sprat',
        'APARTMENT_NUMBER' : 'Broj stana',
        'SELECT_IMAGE' : 'Odaberi sliku',
        'UPDATE' : 'Promeni sliku',
        'UPLOAD' : 'Postavi sliku',
        'PRODUCT_IMAGE_UPLOADED' : 'Slika proizvoda postavljena',
        'PRODUCT_IMAGE_FAILURE' : 'Neuspešno postavljanje slike proizvoda!',
        'BUYER_NOT_DEACTIVATED' : 'Neuspešna deaktivacija kupca!',
        'BUYER_DEACTIVATED' : 'Kupac deaktiviran',
        'BUYER_NOT_ACTIVATED' : 'Neuspešna aktivacija kupca',
        'BUYER_ACTIVATED' : 'Kupac aktiviran',
        'BACK' : 'Nazad',
        'SUBCATEGORY_NAME_ENGLISH': 'Ime podkategorije( engleski )',
        'SUBCATEGORY_NAME_SERBIAN': 'Ime podkategorije( srpski )',
        'ENTER_SUBCATEGORY_NAME': 'Unesite ime podkategorije',
        'NUMBER' : 'broj',
        'REVIEWS' : 'Komentari',
        'REVIEWS_DESC' : 'Pregled i upravljanje komentarima u sistemu',
        'SEARCH_REVIEWS' : 'Pretraga komentara',
        'RATING' : 'Ocena',
        'POSTED_ON' : 'Objavljeno',
        'WAITING' : 'Na čekanju',
        'APPROVED' : 'Odobren',
        'REJECTED' : 'Odbijen',
        'REVIEW' : 'Komentar',
        'COMMENT' : 'Tekst komentara',
        'REJECT' : 'Odbij',
        'APPROVE' : 'Odobri',
        'REVIEW_NOT_APPROVED' : 'Neuspelo odobravanje komentara',
        'REVIEW_APPROVED' : 'Komentar odobren',
        'REVIEW_NOT_REJECTED' : 'Neuspelo odbijanje komentara',
        'REVIEW_REJECTED' : 'Komentar odbijen',
        'MEASUREMENT_UNIT' : 'Jedinica mere',
        'AVERAGE_WEIGHT' : 'Prosečna težina po jedinici mere',
        'ENTER_AVERAGE_WEIGHT' : 'Unesite prosečnu težinu po jedinici mere',
        'TAX_RATE' : 'Poreska stopa',
        'ENTER_TAX_RATE' : 'Unesite poresku stopu',
        'LOADING' : 'Učitavanje...'
      });
    $translateProvider.preferredLanguage('en_EN');
  });

paysAdmin.run(function ($rootScope, $translate, UsersService, $location, $window, ProductsService) {
  $rootScope.serverURL       = "http://185.23.171.43/PEP/PaysRest/";

  $rootScope.englishLangCode = "en_EN";
  $rootScope.serbianLangCode = "rs_RS";

  $rootScope.defaultLang = $rootScope.englishLangCode;
  $rootScope.currentLang = $rootScope.englishLangCode;

  $rootScope.maxItemsPerPage = 20;

  $rootScope.undefinedImageId = -1;

  $rootScope.changeLanguage  = function (langCode) {
    $rootScope.currentLang = langCode;
    $translate.use(langCode);
  };

  $rootScope.credentials = UsersService.getUserCredentials();
  $rootScope.kgUnitId = -1;
  ProductsService.getMeasurementUnits().then(function(data){
    $rootScope.units = data;
    angular.forEach($rootScope.units, function(unit){
      if(unit.code == 'kg'){
        $rootScope.kgUnitId = unit.id;
      }
    });
  });
  $rootScope.$on('$routeChangeStart', function (event, next) {
    console.log($location.url());
    if (next.restricted) {
      if (!$rootScope.isLoggedIn()) {
        $window.location.href = "#/login";
      }
    }
  });

  $rootScope.logoutAdmin = function () {
    UsersService.logoutUser();
    $window.location.href = "#/login";
  };

  $rootScope.isLoggedIn = function () {
    $rootScope.credentials = UsersService.getUserCredentials();
    if ($rootScope.credentials.token != null) {
      return true;
    }
    return false;
  }

  $rootScope.objectPrint = function (obj) {
    console.log(JSON.stringify(obj, null, 4));
  }

});