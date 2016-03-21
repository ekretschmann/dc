'use strict';

// Locations controller
angular.module('buslines').controller('BuslinesController', ['$scope', '$stateParams', '$location', 'lodash', 'Authentication', 'Buslines', 'Locations',
    function ($scope, $stateParams, $location, _, Authentication, Buslines, Locations) {


        $scope.searchText = '';
        $scope.selectedBusstop = undefined;

        $scope.querySearch   = '';

        $scope.times = [];
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
               // console.log($scope.buslines.length);
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
                stops: [],
                labels: [],
                runtimes: [],
                times: []
            });

            $scope.busstops = Locations.query(function() {});
        };

        $scope.getBusline = function() {
            // Create new Location object
            $scope.busline = Buslines.get({
                buslineId: $stateParams.buslineId
            });

            $scope.busstops = Locations.query(function() {});
        };

        $scope.addStopToLine = function(stop) {
            if (stop) {
                $scope.busline.stops.push(stop.info.naptan);
                $scope.busline.times.push(0);
                $scope.searchText = '';
            }
        };

        $scope.create = function() {


            $scope.busline.$save(function(response) {
                $location.path('/buslines');

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.update = function() {
            var busline = $scope.busline;

            busline.$update(function(x) {
                $location.path('/buslines');
                //$location.path('locations/' + location._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.addArrivalTime = function(stop, index) {
            if (stop.arrivals) {
                stop.times.push($scope.times[index]);
            } else {
                stop.times = [$scope.times[index]];
            }
        };


        $scope.addLabel = function() {

            $scope.busline.labels.push($scope.newLabel);
            //$scope.newLine = '';
        };

        $scope.addRuntime = function() {

            console.log($scope.busline);
            $scope.busline.runtimes.push($scope.newRuntime);

            //$scope.newLine = '';
        };


        $scope.removeLabel = function(label) {


            for (var i=0; i<$scope.busline.labels.length; i++) {
                if ($scope.busline.labels[i] === label) {
                    $scope.busline.labels.splice(i, 1);
                }
            }


        };

        $scope.removeRuntime = function(runtime) {


            for (var i=0; i<$scope.busline.runtimes.length; i++) {
                if ($scope.busline.runtimes[i] === runtime) {
                    $scope.busline.runtimes.splice(i, 1);
                }
            }


        };

        $scope.editBusline = function(busline) {
            $location.path('/buslines/' + busline._id+'/edit');
        };

        $scope.removeDepartureTime = function(stop, index) {
            //console.log(stop);
            //console.log(time);
            stop.departures.splice(index, 1);
        };

        $scope.removeArrivalTime = function(stop, index) {
            //console.log(stop);
            //console.log(time);
            stop.arrivals.splice(index, 1);
        };

        $scope.remove = function(busline) {
            if ( busline ) {
                busline.$remove();
                $scope.buslines = _.filter($scope.buslines, function(line) {
                    console.log(line, busline);
                    return line._id !== busline._id;
                });
            }
        };


    }]);
