/**
 * Created by xlin on 6/04/15.
 */
'use strict';

var adminActions = require('../../app/controllers/admin/admin-actions.server.controller');

module.exports = function(app) {
	app.route('/admin/addUser').post(adminActions.addUser);
	app.route('/admin/login').post(adminActions.login);
		//.post(adminActions.requiresLogin, adminActions.createUser);
};
