'use strict';

angular.module('core').controller('HeaderController', function HeaderController($mdDialog, $http, $location, $state, Authentication) {
	this.settings = {
		printLayout: true,
		showRuler: true,
		showSpellingSuggestions: true,
		presentationMode: 'edit'
	};

	this.authentication = Authentication;

	this.menuAction = function(name, ev) {

		if (name === 'ListBusstops') {
			$location.path('/busstops');
		}

		if (name === 'CreateBusstop') {
			$location.path('/busstops/create');
		}

		if (name === 'ImportBusstops') {
			$http.get('/busstops/import')
				.then(function (response) {
					console.log(response);
				});
		}

		if (name === 'DropImport') {
			$location.path('/busstops/drop');
		}

		if (name === 'ListUsers') {
			$location.path('/users');
		}

		if (name === 'CreateUser') {
			$location.path('/users/create');
		}
	};

	this.signOut = function(name, ev) {
		$http.get('/auth/signout');
		this.authentication.user = undefined;
		$location.path('/');

	};


	this.home = function() {

		$location.path('/');
	};

	this.signIn = function(name, ev) {

		$location.path('signin');

		//$mdDialog.show($mdDialog.alert()
		//		.title('Sign In')
		//		.textContent('You triggered the "' + name + '" action')
		//		.ok('Great')
		//		.targetEvent(ev)
		//);

		//$http.post('/auth/signin', $scope.credentials).success(function(response) {
		//	// If successful we assign the response to the global user model
		//	$scope.authentication.user = response;
        //
		//	// And redirect to the index page
		//	$location.path('/');
		//}).error(function(response) {
		//	$scope.error = response.message;
		//});
	};
});
