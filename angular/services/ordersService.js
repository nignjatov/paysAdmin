angular.module('paysAdmin').service('OrdersService',
  function ($rootScope, $q, $http) {

    return {
      getOrders: function () {
        var deffered = $q.defer();
        $http.get("order").
          success(function (data, status) {
            if (status == 200) {
              deffered.resolve(data);
            } else {
              console.log("getOrders | Status not OK " + status);
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
  }
);