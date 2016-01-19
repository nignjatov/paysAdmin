angular.module('paysAdmin').service('CategoryService',
  function ($rootScope, $q, $http) {

    return {
      getCategories: function () {
        var deffered = $q.defer();
        $http.get("product_category_first").
          success(function (data, status) {
            if (status == 200) {
              deffered.resolve(data);
            } else {
              console.log("getCategories | Status not OK " + status);
              deffered.reject("Error");
            }

          }).
          error(function (data, status) {
            console.log("Error " + status);
            deffered.reject("Error");
          });

        return deffered.promise;
      },

      createCategory: function (categoryData) {
        var deffered = $q.defer();
        $http.post("product_category",categoryData).
          success(function (data, status) {
            if (status == 200) {
              deffered.resolve(data);
            } else {
              console.log("createCategory | Status not OK " + status);
              deffered.reject("Error");
            }

          }).
          error(function (data, status) {
            console.log(" createCategory | Error " + status);
            deffered.reject("Error");
          });

        return deffered.promise;
      },

      updateCategory: function (catId,categoryData) {
        var deffered = $q.defer();
        $http.put("product_category/"+catId,categoryData).
          success(function (data, status) {
            if (status == 200) {
              deffered.resolve(data);
            } else {
              console.log("updateCategory | Status not OK " + status);
              deffered.reject("Error");
            }

          }).
          error(function (data, status) {
            console.log(" updateCategory | Error " + status);
            deffered.reject("Error");
          });

        return deffered.promise;
      },

      deleteCategory: function (categoryId) {
        var deffered = $q.defer();
        $http.delete("product_category/"+categoryId).
          success(function (data, status) {
            if (status == 200) {
              deffered.resolve(data);
            } else {
              console.log("deleteCategory | Status not OK " + status);
              deffered.reject("Error");
            }

          }).
          error(function (data, status) {
            console.log(" deleteCategory | Error " + status);
            deffered.reject("Error");
          });

        return deffered.promise;
      }
    }
  });