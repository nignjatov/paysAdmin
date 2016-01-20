angular.module('paysAdmin').controller("productsCtrl", ["$scope", "$rootScope", "$filter", "ProductsService", "CategoryService", "Notification",
  function ($scope, $rootScope, $filter, ProductsService, CategoryService, Notification) {

    $scope.products        = [];
    $scope.selectedProduct = null;
    ProductsService.getProducts().then(function (data) {
      $scope.products = data;
      CategoryService.getCategories().then(function (data) {
        $scope.categories = data;
        _mergeProductsWithCategories($scope.products, $scope.categories);
      })
    });

    $scope.selectProduct = function (product) {
      $scope.selectedProduct = product;
    }

    $scope.newProduct = function () {
      $scope.selectedProduct = {
        name: {
          default: '',
          localization: {
            en_EN: "",
            rs_RS: ""
          }
        },
        shortDesc: {
          default: '',
          localization: {
            en_EN: "",
            rs_RS: ""
          }
        },
        fullDesc: {
          default: '',
          localization: {
            en_EN: "",
            rs_RS: ""
          }
        }
      }
    }

    $scope.saveProduct = function () {
      $scope.selectedProduct.name.default      = $scope.selectedProduct.name.localization[$rootScope.defaultLang];
      $scope.selectedProduct.shortDesc.default = $scope.selectedProduct.shortDesc.localization[$rootScope.defaultLang];
      $scope.selectedProduct.fullDesc.default  = $scope.selectedProduct.fullDesc.localization[$rootScope.defaultLang];
      if ($scope.selectedProduct.id) {
        //Update existing product
        ProductsService.updateProduct($scope.selectedProduct.id, $scope.selectedProduct).then(function (data) {
          Notification.success({message: $filter('translate')('PRODUCT_UPDATED')});
          $scope.selectedProduct = null;
          //TODO handle category and picture
        }).catch(function (err) {
          console.log(err);
          Notification.error({message: $filter('translate')('PRODUCT_NOT_UPDATED')});
        });

      } else {
        //Create new product
        ProductsService.createProduct($scope.selectedProduct).then(function (data) {
          Notification.success({message: $filter('translate')('PRODUCT_CREATED')});
          $scope.products.push(data);
          $scope.selectedProduct = null;
          //TODO handle category and picture
        }).catch(function (err) {
          console.log(err);
          Notification.error({message: $filter('translate')('PRODUCT_NOT_CREATED')});
        });

      }
      $rootScope.objectPrint($scope.selectedProduct);
    }

    $scope.deleteProduct         = function () {
      ProductsService.deleteProduct($scope.selectedProduct.id).then(function (data) {
        Notification.success({message: $filter('translate')('PRODUCT_DELETED')});
        $scope.products.splice($scope.products.indexOf($scope.selectedProduct),1);
        $scope.selectedProduct = null;
      }).catch(function (err) {
        Notification.error({message: $filter('translate')('PRODUCT_NOT_DELETED')});
      });
    }

    $scope.uploadProfilePicture = function () {
      //if (typeof scope.profilePic.flow.files !== 'undefined') {
      //  DistributorService.uploadDistributorProfileImage(scope.distributor.id,
      //    scope.distributor.images.profile ? scope.distributor.images.profile : rootScope.undefinedImageId,
      //    scope.profilePic.flow).then(function (data) {
      //      Notification.success({message: filter('translate')('PROFILE_IMAGE_UPLOADED')});
      //      scope.profilePic.flow.cancel();
      //    }).catch(function (err) {
      //      Notification.error({message: filter('translate')('PROFILE_IMAGE_FAILURE')});
      //      scope.profilePic.flow.cancel();
      //    });
      //
      //}
    }

    _mergeProductsWithCategories = function (products, categories) {
      angular.forEach(products, function (product) {
        product.flow = null;
      })
    }
    $scope.sortType              = "id";
    $scope.sortReverse           = false;
    $scope.searchWord            = '';
  }]);
