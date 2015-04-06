/**
 * Created by xlin on 6/04/15.
 */
'use strict';

var _ = require('lodash'),
	errorHandler = require('../errors.server.controller'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	AdminUser = mongoose('AdminUser');

exports.adduser = function(req, res) {
	console.log(req);
	return false;
};
