'use strict';

// Locations controller
angular.module('locations').controller('LocationsController', ['$scope', '$stateParams', '$location', '$http','Authentication', 'Locations',
	function($scope, $stateParams, $location, $http, Authentication, Locations) {
		$scope.authentication = Authentication;

		//$scope.lines = [];

		$scope.newLine = '';
		$scope.newLabel = 'test';
        $scope.labelToDrop = '';


		// Create new Location
		$scope.newBusstop = function() {
			// Create new Location object
			$scope.location = new Locations ({
				type: 'busstop',
				name: 'unknown',
				lat: 0,
				lng: 0,
				info: []
			});


		};

        $scope.dropLabel = function() {

            $http.get('/busstops/drop/'+$scope.labelToDrop)
                .then(function (response) {
                    console.log(response);
                });

        };

		$scope.create = function() {

			$scope.location.$save(function(response) {
				$location.path('/busstops');

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.addLine = function() {
			$scope.location.info.push($scope.newLine);
			//$scope.newLine = '';
		};

        $scope.addLabel = function() {
            $scope.location.labels.push($scope.newLabel);
            //$scope.newLine = '';
        };

		$scope.removeLine = function(line) {


			for (var i=0; i<$scope.location.info.length; i++) {
				if ($scope.location.info[i] === line) {
                    $scope.location.info.splice(i, 1);
				}
			}


		};

        $scope.removeLabel = function(label) {


            for (var i=0; i<$scope.location.labels.length; i++) {
                if ($scope.location.labels[i] === label) {
                    $scope.location.labels.splice(i, 1);
                }
            }


        };

		// Remove existing Location
		$scope.remove = function(location) {
			if ( location ) { 
				location.$remove();

				for (var i in $scope.locations) {
					if ($scope.locations [i] === location) {
						$scope.locations.splice(i, 1);
					}
				}
			} else {
				$scope.location.$remove(function() {
					$location.path('locations');
				});
			}
		};

		// Update existing Location
		$scope.update = function() {
			var location = $scope.location;

			location.$update(function(x) {
                $location.path('/busstops');
				//$location.path('locations/' + location._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Locations
		$scope.find = function() {
			$scope.locations = Locations.query(function() {
                $scope.nextPage();
            });


		};

        $scope.onPaginate = function(page, limit) {
            $scope.query.page = page;
            $scope.query.limit = limit;
            $scope.nextPage();
        };

        $scope.nextPage = function() {

            $scope.busstops = [];
            var min = Math.min(($scope.query.page-1) * $scope.query.limit);
            var max = Math.min($scope.query.page * $scope.query.limit -1, $scope.locations.length);
            for (var i=min; i<max; i++) {
                $scope.busstops.push($scope.locations[i]);
            }

            console.log(min,max);
           // console.log($scope.busstops);
        };

		// Find existing Location
		$scope.findOne = function() {
			$scope.location = Locations.get({ 
				locationId: $stateParams.locationId
			});
		};


		$scope.selected = [];

		$scope.query = {
			order: 'name',
			limit: 20,
			page: 1
		};

		$scope.editBusstop = function(busstop) {
			$location.path('/busstops/' + busstop._id+'/edit');
		};



	}
]);
