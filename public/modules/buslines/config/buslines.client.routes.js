'use strict';

//Setting up route
angular.module('buslines').config(['$stateProvider',
  function ($stateProvider) {
    // Locations state routing
    $stateProvider.
    state('listBuslines', {
      url: '/buslines',
      templateUrl: 'modules/buslines/views/list-buslines.client.view.html'
    }).
    //state('listBusstops', {
    //  url: '/busstops',
    //  templateUrl: 'modules/locations/views/list-busstops.client.view.html'
    //}).
    //state('createLocation', {
    //  url: '/locations/create',
    //  templateUrl: 'modules/locations/views/create-location.client.view.html'
    //}).
    //state('viewLocation', {
    //  url: '/locations/:locationId',
    //  templateUrl: 'modules/locations/views/view-location.client.view.html'
    //}).
    //state('editLocation', {
    //  url: '/locations/:locationId/edit',
    //  templateUrl: 'modules/locations/views/edit-location.client.view.html'
    //}).
    state('editBusline', {
      url: '/buslines/:buslineId/edit',
      templateUrl: 'modules/buslines/views/edit-busline.client.view.html'
    }).
    state('createBusline', {
      url: '/buslines/create',
      templateUrl: 'modules/buslines/views/create-busline.client.view.html'
    });
  }
]);
