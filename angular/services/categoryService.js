angular.module('paysAdmin').service('CategoryService',
     function ($rootScope, $q, $http) {

         return {
             getCategories : function () {
                 var deffered = $q.defer();
                 $http.get("product_category").
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
             }
             }
    });