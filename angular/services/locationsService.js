angular.module('paysAdmin').service('LocationsService',
  function ($rootScope, $q, $http) {

    return {
      getLocations: function () {
        var deffered = $q.defer();
        $http.get("delivery_place").
          success(function (data, status) {
            if (status == 200) {
              deffered.resolve(data);
            } else {
              console.log("getLocations | Status not OK " + status);
              deffered.reject("Error");
            }

          }).
          error(function (data, status) {
            console.log("Error " + status);
            deffered.reject("Error");
          });

        return deffered.promise;
      },
      getCities: function () {
        var deffered = $q.defer();
        $http.get("city").
        success(function (data, status) {
          if (status == 200) {
            deffered.resolve(data);
          } else {
            console.log("getCities | Status not OK " + status);
            deffered.reject("Error");
          }

        }).
        error(function (data, status) {
          console.log("Error " + status);
          deffered.reject("Error");
        });

        return deffered.promise;
      },
      updateLocation : function(id,locationData){
        var deffered = $q.defer();
        $http.put("delivery_place/" + id, locationData).
        success(function (data, status) {
          if (status == 200) {
            deffered.resolve(data);
          } else {
            console.log("updateLocation | Status not OK " + status);
            deffered.reject("Error");
          }

        }).
        error(function (data, status) {
          console.log(" updateLocation | Error " + status);
          deffered.reject("Error");
        });

        return deffered.promise;
      },
      createLocation: function (locationData) {
        var deffered = $q.defer();
        $http.post("delivery_place", locationData).
        success(function (data, status) {
          if (status == 200) {
            deffered.resolve(data);
          } else {
            console.log("createLocation | Status not OK " + status);
            deffered.reject("Error");
          }

        }).
        error(function (data, status) {
          console.log(" createLocation | Error " + status);
          deffered.reject("Error");
        });

        return deffered.promise;
      },
    }
  }
);