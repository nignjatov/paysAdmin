angular.module('paysAdmin').controller("redirectCtrl", ["$scope", "$routeParams","$window","UsersService",
    function ($scope, $routeParams,$window, UsersService) {

        console.log("redirectCtrl!");
        var token = $routeParams.token;
        var idmId = $routeParams.id;
        var role = $routeParams.role;

        console.log(token);
        console.log(idmId);
        console.log(role);

        UsersService.storeUserCredentials(token,idmId,role);

        $window.location.href = "#/";

    }]);