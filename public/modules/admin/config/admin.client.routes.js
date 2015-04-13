/**
 * Created by xlin on 6/04/15.
 */
'use strict';

angular.module('admin').config(['$stateProvider',
	function($stateProvider) {

		$stateProvider.
		state('admin', {
			url: '/admin',
			templateUrl: 'modules/admin/views/index.client.view.html'
		}).
		state('login', {
			url: '/admin/login',
			templateUrl: 'modules/admin/views/login.client.view.html'
		}).
		state('addUser', {
			url: '/admin/users/new',
			templateUrl: 'modules/admin/views/add.user.client.view.html'
		}).
		state('admin/', {
			url: '/admin/',
			templateUrl: 'modules/admin/views/index.client.view.html'
		}).
		state('manageUsers', {
			url: '/admin/users',
			templateUrl: 'modules/admin/views/manage.users.client.view.html'
		}).
		state('editUser', {
			url: '/admin/users/:userId',
			templateUrl: 'modules/admin/views/edit.user.client.view.html'
		}).
		state('managePlans', {
			url: '/admin/plans',
			templateUrl: 'modules/admin/views/manage.plans.client.view.html'
		}).
		state('addPlan', {
			url: '/admin/plans/new',
			templateUrl: 'modules/admin/views/add.plan.client.view.html'
		}).
		state('editPlan', {
			url: '/admin/plans/edit/:planId',
			templateUrl: 'modules/admin/views/edit.plan.client.view.html'
		}).
		state('manageBlogs', {
			url: '/admin/blogs',
			templateUrl: 'modules/admin/views/manage.blogs.client.view.html'
		}).
		state('addBlog', {
			url: '/admin/blogs/new',
			templateUrl: 'modules/admin/views/add.blog.client.view.html'
		}).
		state('editBlog', {
			url: '/admin/blogs/edit/:blogId',
			templateUrl: 'modules/admin/views/edit.blog.client.view.html'
		}).
		state('manageProducts', {
			url: '/admin/products',
			templateUrl: 'modules/admin/views/manage.products.client.view.html'
		}).
		state('addProduct', {
			url: '/admin/products/new',
			templateUrl: 'modules/admin/views/add.product.client.view.html'
		}).
		state('editProduct', {
			url: '/admin/products/edit/:productId',
			templateUrl: 'modules/admin/views/edit.product.client.view.html'
		}).
		state('manageOrders', {
			url: '/admin/orders',
			templateUrl: 'modules/admin/views/manage.orders.client.view.html'
		}).
		state('addOrder', {
			url: '/admin/orders/new',
			templateUrl: 'modules/admin/views/add.order.client.view.html'
		}).
		state('markOrder', {
			url: '/admin/orders/edit/:orderId',
			templateUrl: 'modules/admin/views/edit.order.client.view.html'
		}).
		state('manageContacts', {
			url: '/admin/contacts',
			templateUrl: 'modules/admin/views/manage.contacts.client.view.html'
		}).
		state('contactUs', {
			url: '/contactus',
			templateUrl: 'modules/core/views/contactus.client.view.html'
		}).
		state('markContact', {
			url: '/admin/orders/edit/:contactId',
			templateUrl: 'modules/admin/views/edit.contact.client.view.html'
		}).state('aboutUs', {
		url: '/aboutus',
		templateUrl: 'modules/core/views/aboutus.client.view.html'
		});
	}
]);
