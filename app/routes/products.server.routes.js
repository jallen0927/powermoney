'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	products = require('../../app/controllers/products.server.controller');

module.exports = function(app) {
	// Product Routes
	app.route('/products')
		.get(products.list)
		.post(users.requiresLogin, products.create);

	app.route('/products/:productId')
		.get(products.read)
		.put(users.requiresLogin, products.update)
		.delete(users.requiresLogin, products.delete);

	app.route('/galleries')
		.get(products.galleries);
	// Finish by binding the product middleware
	app.param('productId', products.productByID);
};
