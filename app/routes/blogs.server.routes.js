'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	blogs = require('../../app/controllers/blogs.server.controller');

module.exports = function(app) {
	// Blog Routes
	app.route('/blogs')
		.get(blogs.list)
		.post(users.requiresLogin, blogs.create);

	app.route('/blogs/:blogId')
		.get(blogs.read)
		.put(users.requiresLogin, blogs.update)
		.delete(users.requiresLogin, blogs.delete);

	// Finish by binding the blog middleware
	app.param('blogId', blogs.blogByID);
};
