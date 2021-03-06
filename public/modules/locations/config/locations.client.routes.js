'use strict';

//Setting up route
angular.module('locations').config(['$stateProvider',
    function ($stateProvider) {
        // Locations state routing
        $stateProvider.
            state('listLocations', {
                url: '/locations',
                templateUrl: 'modules/locations/views/list-locations.client.view.html'
            }).
            state('createLocation', {
                url: '/locations/create',
                templateUrl: 'modules/locations/views/create-location.client.view.html'
            }).
            state('viewLocation', {
                url: '/locations/:locationId',
                templateUrl: 'modules/locations/views/view-location.client.view.html'
            }).
            state('editLocation', {
                url: '/locations/:locationId/edit',
                templateUrl: 'modules/locations/views/edit-location.client.view.html'
            }).
            state('listBusstops', {
                url: '/busstops',
                templateUrl: 'modules/locations/views/list-busstops.client.view.html'
            }).
            state('editBusstop', {
                url: '/busstops/:locationId/edit',
                templateUrl: 'modules/locations/views/edit-busstop.client.view.html'
            }).
            state('createBusstop', {
                url: '/busstops/create',
                templateUrl: 'modules/locations/views/create-busstop.client.view.html'
            }).
            state('dropImport', {
                url: '/busstops/drop',
                templateUrl: 'modules/locations/views/drop-busstops.client.view.html'
            });



    }
]);
