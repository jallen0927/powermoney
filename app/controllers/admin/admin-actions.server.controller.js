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
