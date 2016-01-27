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
      updateProduct: function (productId, productData) {
        var deffered = $q.defer();
        $http.put("product/" + productId, productData).
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
        $http.post("product", productData).
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
        $http.delete("product/" + productId).
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
      },
      putProductToCategory: function (categoryId, productId) {
        var deffered = $q.defer();
        $http.put("product_category/" + categoryId + "/products/" + productId).
          success(function (data, status) {
            if (status == 200) {
              deffered.resolve(data);
            } else {
              console.log("putProductToCategory | Status not OK " + status);
              deffered.reject("Error");
            }

          }).
          error(function (data, status) {
            console.log(" putProductToCategory | Error " + status);
            deffered.reject("Error");
          });

        return deffered.promise;
      },
      getProductImage: function (productId, imageId) {
        var deffered = $q.defer();

        $http.get("product/" + productId + "/images/" + imageId + "/imagefile").
          success(function (data, status) {
            if (status == 200) {
              data.index = productId;
              deffered.resolve(data);
            } else {
              console.log("getVehicleImage |Status not OK " + status);
              deffered.reject("Error");
            }

          }).
          error(function (data, status) {
            console.log("Error " + status);
            deffered.reject("Error");
          });
        return deffered.promise;
      },
      uploadProductImage: function (productId, imageId, flowObj) {
        var deferred = $q.defer();
        //image doesnt exists,create new one
        if (imageId == $rootScope.undefinedImageId) {
          flowObj.opts.target = $rootScope.serverURL + "product/" + productId + "/imagefile";
        } else {
          // update current picture of product
          flowObj.opts.target = $rootScope.serverURL + "product/" + productId + "/image/" + imageId + "/imagefile";
        }
        flowObj.opts.testChunks        = false;
        flowObj.opts.fileParameterName = "file";
        console.log(flowObj.opts);
        flowObj.on('fileSuccess', function (event, resp) {
          console.log('fileSuccess ', resp);
          deferred.resolve(JSON.parse(resp));
        });
        flowObj.on('fileError', function (event, err) {
          console.log('fileError ', err);
          if (err.length > 0) {
            deferred.reject(err);
          } else {
            deferred.resolve(err);
          }
        });
        flowObj.upload();
        return deferred.promise;
      }
    }
  });