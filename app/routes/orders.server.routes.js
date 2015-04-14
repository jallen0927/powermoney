'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	orders = require('../../app/controllers/orders.server.controller');

module.exports = function(app) {
	// Order Routes
	app.route('/orders')
		.get(orders.list)
		.post(users.requiresLogin, orders.create);

	app.route('/orders/:orderId')
		.get(orders.read)
		.put(users.requiresLogin, orders.hasAuthorization, orders.update)
		.delete(users.requiresLogin, orders.hasAuthorization, orders.delete);

	// Finish by binding the order middleware
	app.param('orderId', orders.orderByID);
};
