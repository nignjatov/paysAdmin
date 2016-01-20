angular.module('paysAdmin').service('ProductsService',
  function ($rootScope, $q, $http) {

    return {
      getProducts: function () {
        var deffered = $q.defer();
        $http.get("product").
          success(function (data, status) {
            if (status == 200) {
              deffered.resolve(data);
            } else {
              console.log("getProducts | Status not OK " + status);
              deffered.reject("Error");
            }

          }).
          error(function (data, status) {
            console.log("Error " + status);
            deffered.reject("Error");
          });

        return deffered.promise;
      },
      updateProduct : function(productId, productData){
        var deffered = $q.defer();
        $http.put("product/"+productId,productData).
          success(function (data, status) {
            if (status == 200) {
              deffered.resolve(data);
            } else {
              console.log("updateProduct | Status not OK " + status);
              deffered.reject("Error");
            }

          }).
          error(function (data, status) {
            console.log(" updateProduct | Error " + status);
            deffered.reject("Error");
          });

        return deffered.promise;
      },
      createProduct: function (productData) {
        var deffered = $q.defer();
        $http.post("product",productData).
          success(function (data, status) {
            if (status == 200) {
              deffered.resolve(data);
            } else {
              console.log("createProduct | Status not OK " + status);
              deffered.reject("Error");
            }

          }).
          error(function (data, status) {
            console.log(" createProduct | Error " + status);
            deffered.reject("Error");
          });

        return deffered.promise;
      },
      deleteProduct: function (productId) {
        var deffered = $q.defer();
        $http.delete("product/"+productId).
          success(function (data, status) {
            if (status == 200) {
              deffered.resolve(data);
            } else {
              console.log("deleteProduct | Status not OK " + status);
              deffered.reject("Error");
            }

          }).
          error(function (data, status) {
            console.log(" deleteProduct | Error " + status);
            deffered.reject("Error");
          });

        return deffered.promise;
      }
    }
  });