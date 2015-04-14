'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Blog = mongoose.model('Blog'),
	_ = require('lodash');

/**
 * Create a blog
 */
exports.create = function(req, res) {
	var blog = new Blog(req.body);
	blog.user = req.user;

	blog.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(blog);
		}
	});
};

/**
 * Show the current blog
 */
exports.read = function(req, res) {
	console.log('read');
	res.json(req.blog);
};

/**
 * Update a blog
 */
exports.update = function(req, res) {
	var blog = req.blog;

	blog = _.extend(blog, req.body);

	blog.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(blog);
		}
	});
};

/**
 * Delete an blog
 */
exports.delete = function(req, res) {
	var blog = req.blog;

	blog.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(blog);
		}
	});
};

/**
 * List of Blogs
 */
exports.list = function(req, res) {
	Blog.find().sort('-created').populate('user', 'displayName').exec(function(err, blogs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(blogs);
		}
	});
};

/**
 * Blog middleware
 */
exports.blogByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Blog is invalid'
		});
	}

	Blog.findById(id).populate('user', 'displayName').exec(function(err, blog) {
		if (err) return next(err);
		if (!blog) {
			return res.status(404).send({
				message: 'Blog not found'
			});
		}
		req.blog = blog;
		next();
	});
};

/**
 * Blog authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.blog.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
