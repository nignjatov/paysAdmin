angular.module('paysAdmin').controller("reviewsCtrl", ["$scope", "$rootScope", "$filter", "ReviewsService","Notification",
  function ($scope, $rootScope, $filter, ReviewsService,Notification) {
    //Load and merge data
    $scope.selectedReview = null;
    $scope.reviews        = null;

    ReviewsService.getReviews().then(function (data) {
      $scope.reviews = data;
      angular.forEach($scope.reviews, function (review) {
        if (review.approved == 'W') {
          review.status = "WAITING";
        } else if (review.approved == 'A') {
          review.status = "APPROVED";
        } else if (review.approved == 'R') {
          review.status = "REJECTED";
        }
        review.stars = [];
        for (var j = 1; j <= review.rating; j++) {
          review.stars.push(j);
        }
      });
    });
    $scope.selectReview   = function (review) {
      $scope.selectedReview = review;
    };

    $scope.goBack = function () {
      $scope.selectedReview = null;
    }

    $scope.approveReview = function () {
      ReviewsService.approveReview($scope.selectedReview.id).then(function(){
        Notification.success({message: $filter('translate')('REVIEW_APPROVED')});
        $scope.selectedReview.status = "APPROVED";
        $scope.selectedReview.approved = 'A';
        $scope.selectedReview = null;
      }).catch(function(){
        Notification.error({message: $filter('translate')('REVIEW_NOT_APPROVED')});
      });
    }

    $scope.rejectReview = function () {
      ReviewsService.rejectReview($scope.selectedReview.id).then(function(){
        Notification.success({message: $filter('translate')('REVIEW_REJECTED')});
        $scope.selectedReview.status = "REJECTED";
        $scope.selectedReview.approved = 'R';
        $scope.selectedReview = null;
      }).catch(function(){
        Notification.error({message: $filter('translate')('REVIEW_NOT_REJECTED')});
      });
    }

    $scope.sortType    = "date";
    $scope.sortReverse = true;
    $scope.searchWord  = '';
  }]);