'use strict';

// Locations controller
angular.module('buslines').controller('BuslinesController', ['$scope', '$stateParams', '$location', 'Authentication', 'lodash','Buslines', 'Locations',
    function ($scope, $stateParams, $location, Authentication, _, Buslines, Locations) {


        $scope.searchText = '';

        $scope.getMatches = function(searchText) {
            return _.find($scope.busstops, function(stop) {
                stop.name.startsWith(searchText);
            });
        };

        // Find a list of Locations
        $scope.find = function () {
            $scope.buslines = Buslines.query(function () {
                //$scope.nextPage();
                console.log($scope.buslines.length);
            });

            $scope.busstops = Locations.query(function() {
            });

        };

        // Create new Location
        $scope.newBusline = function() {
            // Create new Location object
            $scope.busline = new Buslines ({
                name: ''
            });




        };

        $scope.create = function() {
            console.log($scope.busline);
        };

    }]);
