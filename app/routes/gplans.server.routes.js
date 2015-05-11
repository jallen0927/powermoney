'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	gplans = require('../../app/controllers/gplans.server.controller');

module.exports = function(app) {
	// Gplan Routes
	app.route('/gplans')
		.get(gplans.list)
		.post(users.requiresLogin, gplans.create);

	app.route('/gplans/:gplanId')
		.get(gplans.read)
		.put(users.requiresLogin, gplans.update)
		.delete(users.requiresLogin, gplans.delete);

	// Finish by binding the gplan middleware
	app.param('gplanId', gplans.gplanByID);
};
