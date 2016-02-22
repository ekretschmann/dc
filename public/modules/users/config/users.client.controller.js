'use strict';

// Locations controller
angular.module('users').controller('UsersController', function($scope, $stateParams, $http, Authentication, Users) {
		$scope.authentication = Authentication;

		//$scope.lines = [];


		// Find a list of Locations
		$scope.find = function() {
			$scope.users = Users.query(function() {
				$scope.nextPage();
			});


		};





	}
);
