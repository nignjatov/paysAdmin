angular.module('paysAdmin').controller("productsCtrl", ["$scope", "$rootScope", "$filter", "ProductsService", "CategoryService", "Notification",
  function ($scope, $rootScope, $filter, ProductsService, CategoryService, Notification) {

    $scope.products        = [];
    $scope.selectedProduct = null;

    $scope.changeCategory = {};

    $scope.loading = true;

    $scope.obj = {
      flow: null
    };

    ProductsService.getProducts().then(function (productData) {
      CategoryService.getCategories().then(function (data) {
        $scope.categories = data;
        _mergeProductsWithCategories(productData, $scope.categories);
        $scope.products = productData;
      })
    });

    $scope.selectProduct = function (product) {
      $scope.changeCategory.rootCategory = null;
      $scope.selectedProduct             = product;
      if($scope.obj.flow){
        $scope.obj.flow.cancel();
      }
      if (!$scope.selectedProduct.img || $scope.selectedProduct.img.length == 0) {
        ProductsService.getProductImage($scope.selectedProduct.id, $scope.selectedProduct.images).then(function (data) {
          for (var j = 0; j < $scope.products.length; j++) {
            if ($scope.products[j].id === data.index) {
              $scope.products[j].img = "data:image/jpeg;base64," + data.document_content;
            }
          }
        });
      }
    }

    $scope.newProduct = function () {
      $scope.changeCategory.rootCategory = null;
      $scope.selectedProduct             = {
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
        },
        avgWeight : 0,
        tax : 0
      }
    }

    $scope.saveProduct = function () {
      $scope.selectedProduct.name.default      = $scope.selectedProduct.name.localization[$rootScope.defaultLang];
      $scope.selectedProduct.shortDesc.default = $scope.selectedProduct.shortDesc.localization[$rootScope.defaultLang];
      $scope.selectedProduct.shortDesc.default = $scope.selectedProduct.shortDesc.localization[$rootScope.defaultLang];
      $scope.selectedProduct.fullDesc.default  = $scope.selectedProduct.fullDesc.localization[$rootScope.defaultLang];
      console.log($scope.selectedProduct);
      if($scope.selectedProduct.unit == $rootScope.kgUnitId){
        $scope.selectedProduct.avgWeight = 0;
      }
      var newCategory = $scope.getNewCategory();
      if ($scope.selectedProduct.id) {
        //Update existing product
        ProductsService.updateProduct($scope.selectedProduct.id, $scope.selectedProduct).then(function (data) {
          Notification.success({message: $filter('translate')('PRODUCT_UPDATED')});
          if (newCategory) {
            ProductsService.putProductToCategory(newCategory.id, $scope.selectedProduct.id).then(function (data) {
              $scope.selectedProduct.categories = [];
              $scope.selectedProduct.categories.push(newCategory.id);
              _assignCategoryDataToProduct($scope.selectedProduct, $scope.categories);
              $scope.selectedProduct            = null;
              Notification.success({message: $filter('translate')('CATEGORY_UPDATED')});
            }).catch(function (err) {
              Notification.error({message: $filter('translate')('CATEGORY_NOT_UPDATED')});
              $scope.selectedProduct = null;
            });
          } else {
            $scope.selectedProduct = null;
          }
          //TODO picture
        }).catch(function (err) {
          console.log(err);
          Notification.error({message: $filter('translate')('PRODUCT_NOT_UPDATED')});
        });

      } else {
        //Create new product
        ProductsService.createProduct($scope.selectedProduct).then(function (productData) {
          Notification.success({message: $filter('translate')('PRODUCT_CREATED')});
          if (newCategory) {
            ProductsService.putProductToCategory(newCategory.id, productData.id).then(function (data) {
              productData.categories = [];
              productData.categories.push(newCategory.id);
              _assignCategoryDataToProduct(productData, $scope.categories);
              $scope.selectedProduct = null;
              Notification.success({message: $filter('translate')('CATEGORY_UPDATED')});
            }).catch(function (err) {
              Notification.error({message: $filter('translate')('CATEGORY_NOT_UPDATED')});
              $scope.selectedProduct = null;
            });
          } else {
            $scope.selectedProduct = null;
          }
          $scope.products.push(productData);
          //TODO and picture
        }).catch(function (err) {
          console.log(err);
          Notification.error({message: $filter('translate')('PRODUCT_NOT_CREATED')});
        });

      }
      $rootScope.objectPrint($scope.selectedProduct);
    }

    $scope.deleteProduct = function () {
      ProductsService.deleteProduct($scope.selectedProduct.id).then(function (data) {
        Notification.success({message: $filter('translate')('PRODUCT_DELETED')});
        $scope.products.splice($scope.products.indexOf($scope.selectedProduct), 1);
        $scope.selectedProduct = null;
      }).catch(function (err) {
        Notification.error({message: $filter('translate')('PRODUCT_NOT_DELETED')});
      });
    }

    $scope.uploadProductPicture = function () {
      if (typeof $scope.obj.flow.files !== 'undefined') {
        ProductsService.uploadProductImage($scope.selectedProduct.id,
          $scope.selectedProduct.images ? $scope.selectedProduct.images : $rootScope.undefinedImageId,
          $scope.obj.flow).then(function (data) {
            $scope.selectedProduct.images = data.image;
            Notification.success({message: $filter('translate')('PRODUCT_IMAGE_UPLOADED')});
            ProductsService.getProductImage($scope.selectedProduct.id, data.image).then(function (data) {
              for (var j = 0; j < $scope.products.length; j++) {
                if ($scope.products[j].id === data.index) {
                  $scope.products[j].img = "data:image/jpeg;base64," + data.document_content;
                }
              }
            });
            $scope.obj.flow.cancel();
          }).catch(function (err) {
            Notification.error({message: $filter('translate')('PRODUCT_IMAGE_FAILURE')});
            $scope.obj.flow.cancel();
          });

      }
    }

    _mergeProductsWithCategories = function (products, categories) {
      angular.forEach(products, function (product) {
        product.unit = product.unit.id;
        product.avgWeight = parseFloat(product.avgWeight);
        product.tax = parseFloat(product.tax);
//Dirty hack for dirty data in db
        if(product.shortDesc.localization.length == 0){
          product.shortDesc = {
            default : "",
            localization : {}
          }
        }
        if(product.fullDesc.localization.length == 0){
          product.fullDesc = {
            default : "",
            localization : {}
          }
        }
        _assignCategoryDataToProduct(product, categories);
      });
      $scope.loading = false;
    };

    _assignCategoryDataToProduct = function (product, categories) {
      if (product.categories.length > 0) {
        var categoryId = product.categories[0];
        var found      = false;

        angular.forEach(categories, function (root) {
          if (found == false) {
            if (root.id == categoryId) {
              found                = true;
              product.categoryData = root;
            }
            if (root.children.length > 0) {
              angular.forEach(root.children, function (childOne) {
                if (found == false) {
                  if (childOne.id == categoryId) {
                    found                = true;
                    product.categoryData = childOne;
                  }
                  if (childOne.children.length > 0) {
                    angular.forEach(childOne.children, function (childTwo) {
                      if (found == false) {
                        if (childTwo.id == categoryId) {
                          found                = true;
                          product.categoryData = childTwo;
                        }
                      }
                    });
                  }
                }
              });
            }
          }
        })
      }
    };

    $scope.$watch('changeCategory.rootCategory', function () {
      $scope.changeCategory.childOneCategory = null;
      $scope.changeCategory.childTwoCategory = null;
    });

    $scope.$watch('changeCategory.childOneCategory', function () {
      $scope.changeCategory.childTwoCategory = null;
    });

    $scope.getNewCategory = function () {
      if ($scope.changeCategory.childTwoCategory) {
        return $scope.changeCategory.childTwoCategory;
      }
      if ($scope.changeCategory.childOneCategory) {
        return $scope.changeCategory.childOneCategory;
      }
      if ($scope.changeCategory.rootCategory) {
        return $scope.changeCategory.rootCategory;
      }
      return null;
    }

    $scope.goBack = function () {
      $scope.selectedProduct = null;
    }

    $scope.sortType       = "id";
    $scope.sortReverse    = false;
    $scope.searchWord     = '';
  }]);
