/**
 * Created by xlin on 6/04/15.
 */
'use strict';

var adminActions = require('../controllers/admin/admin.actions.server.controller.js'),
	adminAuthentication = require('../controllers/admin/admin.authentication.server.controller.js');

module.exports = function(app) {

	app.route('/admin/addUser').post(adminActions.addUser);
	app.route('/admin/users').get(adminActions.listUsers);
	app.route('/admin/users/:userId').get(adminActions.editUser);

	app.route('/admin/addPlan').post(adminActions.addPlan);
	app.route('/admin/plans').get(adminActions.listPlans);
	app.route('/admin/plans/:planId').get(adminActions.editPlan);

	app.route('/admin/auth').post(adminAuthentication.auth);
};
