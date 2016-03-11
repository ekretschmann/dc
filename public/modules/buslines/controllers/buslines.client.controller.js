'use strict';

// Locations controller
angular.module('buslines').controller('BuslinesController', ['$scope', '$stateParams', '$location', 'lodash', 'Authentication', 'Buslines', 'Locations',
    function ($scope, $stateParams, $location, _, Authentication, Buslines, Locations) {


        $scope.searchText = '';
        $scope.selectedBusstop = undefined;

        $scope.querySearch   = '';

        $scope.times = {};
        $scope.times.arrival = '';
        $scope.times.departure = '';

        $scope.getMatches = function(searchText) {

            if (searchText.length === 0) {
                return [];
            }


            return _.filter($scope.busstops, function(stop) {
                return stop.name.indexOf(searchText) > -1;
            });
        };

        // Find a list of Locations
        $scope.find = function () {
            $scope.buslines = Buslines.query(function () {
                //$scope.nextPage();
                console.log($scope.buslines.length);
            });



        };

        $scope.removeStop = function(stop) {
            for (var i=0; i<$scope.busline.stops.length; i++) {
                if ($scope.busline.stops[i]._id === stop._id) {
                    $scope.busline.stops.splice(i, 1);
                }
            }
        };
        // Create new Location
        $scope.newBusline = function() {
            // Create new Location object
            $scope.busline = new Buslines ({
                name: '',
                stops: []
            });

            $scope.busstops = Locations.query(function() {});
        };

        $scope.addStopToLine = function(stop) {
            if (stop) {
                $scope.busline.stops.push(stop);
                $scope.searchText = '';
            }
        };

        $scope.create = function() {
            console.log($scope.busline);
        };

        $scope.addArrivalTime = function(stop) {
            if (stop.arrivals) {
                stop.arrivals.push($scope.times.arrival);
            } else {
                stop.arrivals = [$scope.times.arrival];
            }
        };

        $scope.addDepartureTime = function(stop) {
            if (stop.departures) {
                stop.departures.push($scope.times.departure);
            } else {
                stop.departures = [$scope.times.departure];
            }
        };




    }]);
