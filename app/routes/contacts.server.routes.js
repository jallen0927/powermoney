'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	contacts = require('../../app/controllers/contacts.server.controller');

module.exports = function(app) {
	// Contact Routes
	app.route('/contacts')
		.get(contacts.list)
		.post(contacts.create);

	app.route('/contacts/:contactId')
		.get(contacts.read)
		.put(users.requiresLogin, contacts.update)
		.delete(users.requiresLogin, contacts.delete);

	// Finish by binding the contact middleware
	app.param('contactId', contacts.contactByID);
};
