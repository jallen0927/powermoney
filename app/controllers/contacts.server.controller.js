'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Contact = mongoose.model('Contact'),
	_ = require('lodash');

/**
 * Create a contact
 */
exports.create = function(req, res) {
	var contact = new Contact(req.body);
	contact.user = req.user;

	contact.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(contact);
		}
	});
};

/**
 * Show the current contact
 */
exports.read = function(req, res) {
	console.log('read');
	res.json(req.contact);
};

/**
 * Update a contact
 */
exports.update = function(req, res) {
	var contact = req.contact;

	contact = _.extend(contact, req.body);

	contact.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(contact);
		}
	});
};

/**
 * Delete an contact
 */
exports.delete = function(req, res) {
	var contact = req.contact;

	contact.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(contact);
		}
	});
};

/**
 * List of Contacts
 */
exports.list = function(req, res) {
	Contact.find().sort('-created').populate('user', 'displayName').exec(function(err, contacts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(contacts);
		}
	});
};

/**
 * Contact middleware
 */
exports.contactByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Contact is invalid'
		});
	}

	Contact.findById(id).populate('user', 'displayName').exec(function(err, contact) {
		if (err) return next(err);
		if (!contact) {
			return res.status(404).send({
				message: 'Contact not found'
			});
		}
		req.contact = contact;
		next();
	});
};

/**
 * Contact authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.contact.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
