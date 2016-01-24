angular.module('paysAdmin').controller("productsCtrl", ["$scope", "$rootScope", "$filter", "ProductsService", "CategoryService", "Notification",
  function ($scope, $rootScope, $filter, ProductsService, CategoryService, Notification) {

    $scope.products        = [];
    $scope.selectedProduct = null;

    $scope.changeCategory = {}
    ProductsService.getProducts().then(function (data) {
      $scope.products = data;
      CategoryService.getCategories().then(function (data) {
        $scope.categories = data;
        _mergeProductsWithCategories($scope.products, $scope.categories);
      })
    });

    $scope.selectProduct = function (product) {
      $scope.changeCategory.rootCategory = null;
      $scope.selectedProduct             = product;
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
        }
      }
    }

    $scope.saveProduct = function () {
      $scope.selectedProduct.name.default      = $scope.selectedProduct.name.localization[$rootScope.defaultLang];
      $scope.selectedProduct.shortDesc.default = $scope.selectedProduct.shortDesc.localization[$rootScope.defaultLang];
      $scope.selectedProduct.fullDesc.default  = $scope.selectedProduct.fullDesc.localization[$rootScope.defaultLang];

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
              $scope.selectedProduct = null;
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
        _assignCategoryDataToProduct(product, categories);
      });
    };

    _assignCategoryDataToProduct = function (product, categories) {
      if (product.categories.length > 0) {
        var categoryId = product.categories[0];
        var found      = false;

        console.log("Product ID " + product.id + " Category Id " + categoryId);
        angular.forEach(categories, function (root) {
          if (found == false) {
            console.log("ROOT " + root.id);
            if (root.id == categoryId) {
              console.log("ROOT " + root.id + " Category Id " + categoryId);
              found                = true;
              product.categoryData = root;
            }
            if (root.children.length > 0) {
              angular.forEach(root.children, function (childOne) {
                console.log("ChildOne " + childOne.id);
                if (found == false) {
                  if (childOne.id == categoryId) {
                    console.log("ChildOne " + root.id + " Category Id " + categoryId);
                    found                = true;
                    product.categoryData = childOne;
                  }
                  if (childOne.children.length > 0) {
                    angular.forEach(childOne.children, function (childTwo) {
                      console.log("ChildTwo " + childTwo.id);
                      if (found == false) {
                        if (childTwo.id == categoryId) {
                          console.log("childTwo " + root.id + " Category Id " + categoryId);
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
    $scope.sortType       = "id";
    $scope.sortReverse    = false;
    $scope.searchWord     = '';
  }]);
