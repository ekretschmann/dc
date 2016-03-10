'use strict';

// Locations controller
angular.module('buslines').controller('BuslinesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Buslines',
    function ($scope, $stateParams, $location, Authentication, Buslines) {

        // Find a list of Locations
        $scope.find = function () {
            $scope.buslines = Buslines.query(function () {
                //$scope.nextPage();
                console.log($scope.buslines.length);
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
