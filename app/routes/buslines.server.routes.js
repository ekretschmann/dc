'use strict';

/**
 * Module dependencies.
 */

module.exports = function(app) {

	var users = require('../../app/controllers/users.server.controller'),
		buslines = require('../../app/controllers/buslines.server.controller');

	app.route('/buslines')
		.get(buslines.list)
		.post(users.requiresLogin, buslines.create);

	app.route('/buslines/:buslineId')
		.get(buslines.read)
		.put(users.requiresLogin, buslines.hasAuthorization, buslines.update)
		.delete(users.requiresLogin, buslines.hasAuthorization, buslines.delete);

	app.param('buslineId', buslines.buslineByID);
};

