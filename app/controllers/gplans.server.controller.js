'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Gplan = mongoose.model('Gplan'),
	_ = require('lodash');

/**
 * Create a gplan
 */
exports.create = function(req, res) {
	var gplan = new Gplan(req.body);
	gplan.user = req.user;

	gplan.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(gplan);
		}
	});
};

/**
 * Show the current gplan
 */
exports.read = function(req, res) {
	console.log('read');
	res.json(req.gplan);
};

/**
 * Update a gplan
 */
exports.update = function(req, res) {
	var gplan = req.gplan;

	gplan = _.extend(gplan, req.body);

	gplan.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(gplan);
		}
	});
};

/**
 * Delete an gplan
 */
exports.delete = function(req, res) {
	var gplan = req.gplan;

	gplan.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(gplan);
		}
	});
};

/**
 * List of Gplans
 */
exports.list = function(req, res) {
	Gplan.find().sort('-created').populate('user', 'displayName').exec(function(err, gplans) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(gplans);
		}
	});
};

/**
 * Gplan middleware
 */
exports.gplanByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Gplan is invalid'
		});
	}

	Gplan.findById(id).populate('user', 'displayName').exec(function(err, gplan) {
		if (err) return next(err);
		if (!gplan) {
			return res.status(404).send({
				message: 'Gplan not found'
			});
		}
		req.gplan = gplan;
		next();
	});
};

/**
 * Gplan authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.gplan.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
