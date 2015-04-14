'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Plan = mongoose.model('Plan'),
	_ = require('lodash');

/**
 * Create a plan
 */
exports.create = function(req, res) {
	var plan = new Plan(req.body);
	plan.user = req.user;

	plan.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(plan);
		}
	});
};

/**
 * Show the current plan
 */
exports.read = function(req, res) {
	console.log('read');
	res.json(req.plan);
};

/**
 * Update a plan
 */
exports.update = function(req, res) {
	var plan = req.plan;

	plan = _.extend(plan, req.body);

	plan.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(plan);
		}
	});
};

/**
 * Delete an plan
 */
exports.delete = function(req, res) {
	var plan = req.plan;

	plan.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(plan);
		}
	});
};

/**
 * List of Plans
 */
exports.list = function(req, res) {
	Plan.find().sort('-created').populate('user', 'displayName').exec(function(err, plans) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(plans);
		}
	});
};

/**
 * Plan middleware
 */
exports.planByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Plan is invalid'
		});
	}

	Plan.findById(id).populate('user', 'displayName').exec(function(err, plan) {
		if (err) return next(err);
		if (!plan) {
			return res.status(404).send({
				message: 'Plan not found'
			});
		}
		req.plan = plan;
		next();
	});
};

/**
 * Plan authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.plan.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
