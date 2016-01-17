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
      },

      /*
       FARMERS
       */


      getFarmers: function () {
        var deffered = $q.defer();
        $http.get("merchant").
          success(function (data, status) {
            if (status == 200) {
              deffered.resolve(data);
            } else {
              console.log("getFarmers | Status not OK " + status);
              deffered.reject("Error");
            }

          }).
          error(function (data, status) {
            console.log("getFarmers | Error " + status);
            deffered.reject("Error");
          });

        return deffered.promise;
      },
      activateFarmer: function (farmer) {
        var deffered = $q.defer();
        $http.put("merchant/" + farmer + "/activate").
          success(function (data, status) {
            if (status == 200) {
              deffered.resolve(data);
            } else {
              console.log("activateFarmer | Status not OK " + status);
              deffered.reject("Error");
            }

          }).
          error(function (data, status) {
            console.log("activateFarmer | Error " + status);
            deffered.reject("Error");
          });
        return deffered.promise;
      },
      deactivateFarmer: function (distributorId) {
        var deffered = $q.defer();
        $http.put("merchant/" + distributorId + "/deactivate").
          success(function (data, status) {
            if (status == 200) {
              deffered.resolve(data);
            } else {
              console.log("deactivateFarmer | Status not OK " + status);
              deffered.reject("Error");
            }

          }).
          error(function (data, status) {
            console.log("deactivateFarmer | Error " + status);
            deffered.reject("Error");
          });
        return deffered.promise;
      },

      /*
       BUYERS
       */
      getBuyers: function () {
        var deffered = $q.defer();
        $http.get("client").
          success(function (data, status) {
            if (status == 200) {
              deffered.resolve(data);
            } else {
              console.log("getBuyers | Status not OK " + status);
              deffered.reject("Error");
            }

          }).
          error(function (data, status) {
            console.log("getBuyers | Error " + status);
            deffered.reject("Error");
          });

        return deffered.promise;
      },

    }
  });