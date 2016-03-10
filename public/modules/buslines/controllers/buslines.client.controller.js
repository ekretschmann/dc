'use strict';

// Locations controller
angular.module('buslines').controller('BuslinesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Buslines', 'Locations',
    function ($scope, $stateParams, $location, Authentication, Buslines, Locations) {


        $scope.searchText = '';
        $scope.selectedBusstop = undefined;

        $scope.getMatches = function(searchText) {

            var result = [];
            for (var i=0; i<$scope.busstops.length; i++) {
                if ($scope.busstops[i].name.startsWith(searchText)) {
                    result.push($scope.busstops[i]);
                }
            }

            return result;

            //return _.find($scope.busstops, function(stop) {
            //    stop.name.startsWith(searchText);
            //});
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

        $scope.addStopToLine = function() {
            $scope.busline.stops.push($scope.selectedBusstop);
            $scope.selectedBusstop = '';
        };

        $scope.create = function() {
            console.log($scope.busline);
        };

    }]);
