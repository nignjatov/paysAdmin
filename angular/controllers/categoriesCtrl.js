angular.module('paysAdmin').controller("categoriesCtrl", ["$scope", "$rootScope", "$filter", "CategoryService", "Notification",
  function ($scope, $rootScope, $filter, CategoryService, Notification) {

    $scope.selectedCategory       = null;
    $scope.selectedCategoryScope  = null;
    $scope.selectedParentCategory = null;

    $scope.loadCategories = function () {
      CategoryService.getCategories().then(function (data) {
        $scope.categories = data;
        angular.forEach($scope.categories, function (rootCat) {
          rootCat.level = 0;
          angular.forEach(rootCat.children, function (firstLevel) {
            firstLevel.level = 1;
            angular.forEach(firstLevel.children, function (secondLevel) {
              secondLevel.level    = 2;
              secondLevel.children = [];
            });
          });
        });
      });
    }

    $scope.canHaveSubcategories = function (scope) {
      if (scope.$modelValue.level < 2) {
        return true;
      }
      return false;
    }

    $scope.canBeDeleted = function (scope) {
      if ((scope.$modelValue.children && scope.$modelValue.children.length > 0) ||
        (scope.$modelValue.products && scope.$modelValue.products.length > 0)) {
        return false;
      } else {
        return true;
      }

    }

    $scope.newSubCategory = function (scope, root) {
      var level = 0;
      if (root == false) {
        $scope.selectedParentCategory = scope.$modelValue;
        level                         = $scope.selectedParentCategory.level + 1;
      } else {
        $scope.selectedParentCategory = null;
      }
      $scope.selectedCategory = {
        level: level,
        name: {
          localization : {}
        },
        products: [],
        children: []
      }
      if ($scope.selectedCategory.level < 2) {
        $scope.selectedCategory.children = [];
      }
    };

    $scope.removeCategory = function (scope) {
      CategoryService.deleteCategory(scope.$modelValue.id)
        .then(function (data) {
          Notification.success({message: $filter('translate')('CATEGORY_DELETED')});
          scope.remove();
        }).catch(function (err) {
          Notification.error({message: $filter('translate')('CATEGORY_NOT_DELETED')});
        });
    };

    $scope.saveCategory = function () {
      $scope.selectedCategory.name.default = $scope.selectedCategory.name.localization[$rootScope.defaultLang];
      if ($scope.selectedCategory.id) {
        CategoryService.updateCategory($scope.selectedCategory.id,
          {
            name: $scope.selectedCategory.name
          }).then(function (data) {
            Notification.success({message: $filter('translate')('CATEGORY_UPDATED')});
            $scope.clearSelectedCategory();
          }).catch(function (err) {
            Notification.error({message: $filter('translate')('CATEGORY_NOT_UPDATED')});
          });
      } else {
        var newCat = {
          name: $scope.selectedCategory.name
        }
        if ($scope.selectedParentCategory) {
          newCat.supercategory = $scope.selectedParentCategory.id;
        }
        $rootScope.objectPrint(newCat);
        CategoryService.createCategory(newCat).then(function (data) {
          Notification.success({message: $filter('translate')('CATEGORY_CREATED')});
          if ($scope.selectedParentCategory) {
            $scope.selectedParentCategory.children.push($scope.selectedCategory);
          }
          $scope.clearSelectedCategory();
          $scope.loadCategories();
        }).catch(function (err) {
          Notification.error({message: $filter('translate')('CATEGORY_NOT_CREATED')});
        });
        ;
      }
    };

    $scope.selectCategory = function (scope) {
      $scope.selectedCategoryScope = scope;
      $scope.selectedCategory      = $scope.selectedCategoryScope.$modelValue;
    }

    $scope.clearSelectedCategory = function () {
      $scope.selectedCategoryScope = null;
      $scope.selectedCategory      = null
    }

    $scope.loadCategories();
  }]);