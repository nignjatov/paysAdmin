angular.module('paysAdmin').service('UsersService',
  function ($rootScope, $q, $http) {

    return {
      getDistributors: function () {
        var deffered = $q.defer();
        $http.get("transporter").
          success(function (data, status) {
            if (status == 200) {
              deffered.resolve(data);
            } else {
              console.log("getDistributors | Status not OK " + status);
              deffered.reject("Error");
            }

          }).
          error(function (data, status) {
            console.log("getDistributors | Error " + status);
            deffered.reject("Error");
          });

        return deffered.promise;
      },
      activateDistributor: function (distributorId) {
        var deffered = $q.defer();
        $http.put("transporter/" + distributorId + "/activate").
          success(function (data, status) {
            if (status == 200) {
              deffered.resolve(data);
            } else {
              console.log("activateDistributor | Status not OK " + status);
              deffered.reject("Error");
            }

          }).
          error(function (data, status) {
            console.log("activateDistributor | Error " + status);
            deffered.reject("Error");
          });
        return deffered.promise;
      },
      deactivateDistributor: function (distributorId) {
        var deffered = $q.defer();
        $http.put("transporter/" + distributorId + "/deactivate").
          success(function (data, status) {
            if (status == 200) {
              deffered.resolve(data);
            } else {
              console.log("deactivateDistributor | Status not OK " + status);
              deffered.reject("Error");
            }

          }).
          error(function (data, status) {
            console.log("deactivateDistributor | Error " + status);
            deffered.reject("Error");
          });
        return deffered.promise;
      }
    }
  });