angular.module('paysAdmin').service('UsersService',
  function ($rootScope, $q, $http, localStorageService) {

    return {
      getDistributors: function
        () {
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
      }
      ,
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
      }
      ,
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
      ,

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
      }
      ,
      activateFarmer: function (farmerId) {
        var deffered = $q.defer();
        $http.put("merchant/" + farmerId + "/activate").
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
      }
      ,
      deactivateFarmer: function (farmerId) {
        var deffered = $q.defer();
        $http.put("merchant/" + farmerId + "/deactivate").
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
      }
      ,

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
      }
      ,
      activateBuyer: function (farmer) {
        var deffered = $q.defer();
        $http.put("client/" + farmer + "/activate").
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
      }
      ,
      deactivateBuyer: function (distributorId) {
        var deffered = $q.defer();
        $http.put("client/" + distributorId + "/deactivate").
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
      }
      ,

      storeUserCredentials: function (token, id, role) {
        if (localStorageService.cookie.isSupported) {
          localStorageService.cookie.clearAll();
          localStorageService.cookie.set("role", role, 1);
          localStorageService.cookie.set("token", token, 1);
          localStorageService.cookie.set("id", id, 1);
        } else {
          console.error("Cookies not supported in this browser!");
        }
      },

      logoutUser: function () {
        if (localStorageService.cookie.isSupported) {
          return localStorageService.cookie.clearAll();
        } else {
          console.error("Cookies not supported in this browser!");
        }
      },

      getUserCredentials: function () {
        if (localStorageService.cookie.isSupported) {
          return {
            role: localStorageService.cookie.get("role"),
            token: localStorageService.cookie.get("token"),
            id: localStorageService.cookie.get("id")
          }
        } else {
          console.error("Cookies not supported in this browser!");
          return null;
        }
      }
    }
  })
;