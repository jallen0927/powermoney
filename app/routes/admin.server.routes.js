/**
 * Created by xlin on 6/04/15.
 */
'use strict';

var adminActions = require('../controllers/admin/admin.actions.server.controller.js'),
	adminAuthentication = require('../controllers/admin/admin.authentication.server.controller.js');

module.exports = function(app) {

	app.route('/admin/auth').post(adminAuthentication.auth);

	app.route('/admin/addUser').post(adminActions.addUser);
	app.route('/admin/users').get(adminActions.listUsers);
	app.route('/admin/users/:userId').get(adminActions.editUser);

	app.route('/admin/addPlan').post(adminActions.addPlan);
	app.route('/admin/plans').get(adminActions.listPlans);
	app.route('/admin/plans/:planId').get(adminActions.editPlan);

	app.route('/admin/addBlog').post(adminActions.addBlog);
	app.route('/admin/blogs').get(adminActions.listBlogs);
	app.route('/admin/blogs/:blogId').get(adminActions.editBlog);

	app.route('/admin/addProduct').post(adminActions.addProduct);
	app.route('/admin/products').get(adminActions.listProducts);
	app.route('/admin/products/:productId').get(adminActions.editProduct);

	app.route('/addOrder').post(adminActions.addOrder);
	app.route('/admin/orders').get(adminActions.listOrders);
	app.route('/admin/orders/:orderId').get(adminActions.markOrder);

	app.route('/admin/addContact').post(adminActions.addContact);
	app.route('/admin/contacts').get(adminActions.listContacts);

};
