angular.module('paysAdmin').controller("locationsCtrl", ["$scope", "$rootScope", "$filter", "LocationsService", "Notification",
    function ($scope, $rootScope, $filter, LocationsService, Notification) {
        //Load and merge data
        $scope.selectedLocation = null;
        $scope.locations = null;

        $scope.hstep = 1;
        $scope.mstep = 30;
        $scope.timeFormat = 'HH:mm';

        $scope.ismeridian = false;
        $scope.confirmPassword = {
            text : ""
        };
        LocationsService.getCities().then(function (data) {
            $scope.cities = data;
            LocationsService.getLocations().then(function (data) {
                $scope.locations = data;
                angular.forEach($scope.locations, function (loc) {
                    if (loc.workHours.length > 1) {
                        var timeString = loc.workHours.split('-');
                        var fromStrings = timeString[0].split(':');
                        var toStrings = timeString[1].split(':');
                        loc.fromTime = new Date(new Date().setHours(parseInt(fromStrings[0]), parseInt(fromStrings[1]), 0, 0));
                        loc.toTime = new Date(new Date().setHours(parseInt(toStrings[0]), parseInt(toStrings[1]), 0, 0));
                    }
                    for (var i = 0; i < $scope.cities.length; i++) {
                        if ((loc.address.city == $scope.cities[i].name) && (loc.address.postalCode == $scope.cities[i].postalCode)) {
                            loc.cityData = $scope.cities[i];
                            loc.cityDataString = JSON.stringify(loc.cityData);
                        }
                    }
                })
            });
        });

        $scope.selectLocation = function (location) {
            $scope.selectedLocation = location;
            $scope.confirmPassword = {
                text : ""
            };
        };

        $scope.goBack = function () {
            $scope.selectedLocation = null;
        };

        $scope.newDeliveryLocation = function () {
            $scope.selectedLocation = {
                email : "",
                password : "",
                address: {},
                fromTime: new Date(new Date().setHours(8, 0, 0, 0)),
                toTime: new Date(new Date().setHours(10, 0, 0, 0))
            }
        };

        $scope.$watch('selectedLocation.cityDataString', function () {
            if ($scope.selectedLocation != null && $scope.selectedLocation.cityDataString != null) {
                $scope.selectedLocation.cityData = JSON.parse($scope.selectedLocation.cityDataString);
            }
        });

        $scope.deleteLocation = function () {
            LocationsService.deleteLocation($scope.selectedLocation.id).then(function(){
                Notification.success({message: $filter('translate')('LOCATION_DELETED')});
                $scope.locations.splice($scope.locations.indexOf($scope.selectedLocation), 1);
            }).catch(function(){
                Notification.success({message: $filter('translate')('LOCATION_NOT_DELETED')});
            });
        }

        $scope.saveLocation = function () {

            $scope.selectedLocation.address.city = $scope.selectedLocation.cityData.name;
            $scope.selectedLocation.address.postalCode = $scope.selectedLocation.cityData.postalCode;
            $scope.selectedLocation.workHours = $filter('date')($scope.selectedLocation.fromTime, $scope.timeFormat) +
                "-" + $filter('date')($scope.selectedLocation.toTime, $scope.timeFormat);
            if ($scope.selectedLocation.id) {
                LocationsService.updateLocation($scope.selectedLocation.id, $scope.selectedLocation).then(function (data) {
                    Notification.success({message: $filter('translate')('LOCATION_UPDATED')});
                    $scope.selectedLocation = null;
                }).catch(function () {
                    Notification.error({message: $filter('translate')('LOCATION_NOT_UPDATED')});
                    $scope.selectedLocation = null;
                });
            } else {
                delete $scope.selectedLocation.fromTime;
                delete $scope.selectedLocation.toTime;
                delete $scope.selectedLocation.minTime;
                delete $scope.selectedLocation.cityData;
                delete $scope.selectedLocation.cityDataString;
                $scope.selectedLocation.username = $scope.selectedLocation.email;
                    LocationsService.createLocation($scope.selectedLocation).then(function (data) {
                    Notification.success({message: $filter('translate')('LOCATION_CREATED')});
                    if (data.workHours.length > 1) {
                        var timeString = data.workHours.split('-');
                        var fromStrings = timeString[0].split(':');
                        var toStrings = timeString[1].split(':');
                        data.fromTime = new Date(new Date().setHours(parseInt(fromStrings[0]), parseInt(fromStrings[1]), 0, 0));
                        data.toTime = new Date(new Date().setHours(parseInt(toStrings[0]), parseInt(toStrings[1]), 0, 0));
                    }
                    for (var i = 0; i < $scope.cities.length; i++) {
                        if ((data.address.city == $scope.cities[i].name) && (data.address.postalCode == $scope.cities[i].postalCode)) {
                            data.cityData = $scope.cities[i];
                            data.cityDataString = JSON.stringify(data.cityData);
                        }
                    }
                    $scope.locations.push(data);
                    $scope.selectedLocation = null;
                }).catch(function () {
                    Notification.error({message: $filter('translate')('LOCATION_NOT_CREATED')});
                    $scope.selectedLocation = null;
                });
            }
        }
        $scope.$watch('selectedLocation.fromTime', function () {
            if ($scope.selectedLocation && $scope.selectedLocation.fromTime) {
                var minToTime = $scope.selectedLocation.fromTime.getTime() + 1 * 3600 * 1000;
                if (minToTime > $scope.selectedLocation.toTime.getTime()) {
                    $scope.selectedLocation.toTime = new Date(minToTime);
                    $scope.selectedLocation.minTime = new Date(minToTime);
                } else {
                    $scope.selectedLocation.minTime = new Date(minToTime);
                }
            }
        });

        $scope.sortType = "id";
        $scope.sortReverse = false;
        $scope.searchWord = '';
    }]);