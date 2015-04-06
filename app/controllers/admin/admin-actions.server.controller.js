/**
 * Created by xlin on 6/04/15.
 */
/**
 * Created by xlin on 6/04/15.
 */
'use strict';

var _ = require('lodash'),
	errorHandler = require('../errors.server.controller'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	AdminUser = mongoose.model('AdminUser');

exports.addUser = function(req, res) {

//	delete req.body.roles;

	var adminUser = new AdminUser(req.body);

	adminUser.provider = 'local';
	adminUser.displayName = adminUser.firstName + ' ' + adminUser.lastName;

	adminUser.save(function(err){
		if(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			adminUser.password = undefined;
			adminUser.salt = undefined;

			req.login(adminUser, function(err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.json(adminUser);
				}
			});
		}
	});
};

exports.login = function(req, res) {
	res.json(req.body);
};

exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}

	next();
};

/**
 * List all admin users
 * @param req
 * @param res
 */
exports.listUsers = function(req, res){
	AdminUser.find().sort('-created').populate('username', 'email').exec(function(err, users) {
		if(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(users);
		}
	});
};

exports.editUser = function(req, res) {
	res.json(req.body);
};
