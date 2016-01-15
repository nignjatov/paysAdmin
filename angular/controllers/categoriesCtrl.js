angular.module('paysAdmin').controller("categoriesCtrl", ["$scope", "$rootScope", "CategoryService", "Notification",
  function ($scope, $rootScope, CategoryService, Notification) {

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
        name: "",
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
          Notification.success("Category deleted");
          scope.remove();
        }).catch(function (err) {
          Notification.error("Failed to delete category");
        });
    };

    $scope.saveCategory = function () {
      if ($scope.selectedCategory.id) {
        CategoryService.updateCategory($scope.selectedCategory.id,
          {
            name: $scope.selectedCategory.name
          }).then(function (data) {
            Notification.success("Category updated");
            $scope.clearSelectedCategory();
          }).catch(function (err) {
            Notification.error("Failed to update category");
          });
      } else {
        var newCat = {
          name: $scope.selectedCategory.name
        }
        if ($scope.selectedParentCategory) {
          newCat.supercategory = $scope.selectedParentCategory.id;
        }
        CategoryService.createCategory(newCat).then(function (data) {
          Notification.success("Category created");
          if ($scope.selectedParentCategory) {
            $scope.selectedParentCategory.children.push($scope.selectedCategory);
          }
          $scope.clearSelectedCategory();
          $scope.loadCategories();
        }).catch(function (err) {
          Notification.error("Failed to create category");
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