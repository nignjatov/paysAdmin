angular.module('paysAdmin').service('ReviewsService',
  function ($rootScope, $q, $http) {

    return {
      getReviews: function () {
        var deffered = $q.defer();
        $http.get("review").
          success(function (data, status) {
            if (status == 200) {
              deffered.resolve(data);
            } else {
              console.log("getReviews | Status not OK " + status);
              deffered.reject("Error");
            }

          }).
          error(function (data, status) {
            console.log("Error " + status);
            deffered.reject("Error");
          });

        return deffered.promise;
      },
      approveReview: function (reviewId) {
        var deffered = $q.defer();
        $http.put("review/"+reviewId+"/approve").
          success(function (data, status) {
            if (status == 200) {
              deffered.resolve(data);
            } else {
              console.log("approveReview | Status not OK " + status);
              deffered.reject("Error");
            }

          }).
          error(function (data, status) {
            console.log("Error " + status);
            deffered.reject("Error");
          });

        return deffered.promise;
      },
      rejectReview: function (reviewId) {
        var deffered = $q.defer();
        $http.put("review/"+reviewId+"/reject").
          success(function (data, status) {
            if (status == 200) {
              deffered.resolve(data);
            } else {
              console.log("rejectReview | Status not OK " + status);
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