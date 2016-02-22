'use strict';

// Locations controller
angular.module('users').controller('UsersController', function ($scope, $stateParams, $http, $location, Authentication, Users) {
        $scope.authentication = Authentication;

        //$scope.lines = [];


        // Find a list of Locations
        $scope.find = function () {
            $scope.users = Users.query(function () {
                $scope.nextPage();
            });


        };

        $scope.newUser = function () {
            $scope.user = new Users({
                firstName: '',
                lastName: '',
                email: '',
                username: '',
                password: ''
            });
        };

        $scope.create = function () {
            $scope.user.$save(function (response) {
                $location.path('/users');

            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };


    }
);
