angular.module('paysAdmin').controller("loginCtrl", ["$scope","$window",
    function ($scope, $window) {

        $scope.login = function () {
            var clientId = "41a888d71e754ee99167eaebecace9c1";
            var domain   = "pays-system.com";

            //redirect url for the user to authenticate
            //itself using the fi-ware oauth
            var newURL            = "http://148.6.81.216/oauth2/authorize"
              + "?response_type=code"
              + "&client_id=" + clientId
              + "&state=xyz"
              + "&redirect_uri=http%3A%2F%2F" + domain
              + "%2Fcallback.php";

            //actual redirect
            console.log(newURL);
            $window.location.href = newURL;
        }
    }]);