'use strict';

module.exports = function(app) {
    var buses = require('../../app/controllers/buses.server.controller');

    // Buses Routes
    app.get('/busstops/import', buses.importBusstops);
    app.get('/busstops/drop/:label', buses.dropBusstops);

    //app.get('/busservices/:busId', buses.busservice);
    //
    //app.get('/busroutes/:routeId', paths.busroute);

    // Finish by binding the Bus middleware
    //app.param('busId', buses.busByID);
};
