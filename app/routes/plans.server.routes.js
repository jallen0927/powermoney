'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	plans = require('../../app/controllers/plans.server.controller');

module.exports = function(app) {
	// Plan Routes
	app.route('/plans')
		.get(plans.list)
		.post(users.requiresLogin, plans.create);

	app.route('/plans/:planId')
		.get(plans.read)
		.put(users.requiresLogin, plans.update)
		.delete(users.requiresLogin, plans.delete);

	// Finish by binding the plan middleware
	app.param('planId', plans.planByID);
};
