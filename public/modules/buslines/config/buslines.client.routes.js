'use strict';

//Setting up route
angular.module('buslines').config(['$stateProvider',
  function ($stateProvider) {
    // Locations state routing
    $stateProvider.
    state('listBuslines', {
      url: '/buslines',
      templateUrl: 'modules/buslines/views/list-buslines.client.view.html'
    });
    //    .
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
    //state('editBusstop', {
    //  url: '/busstops/:locationId/edit',
    //  templateUrl: 'modules/locations/views/edit-busstop.client.view.html'
    //}).
    //state('createBusstop', {
    //  url: '/busstops/create',
    //  templateUrl: 'modules/locations/views/create-busstop.client.view.html'
    //});
  }
]);
