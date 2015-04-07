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
			url: '/admin/users/add',
			templateUrl: 'modules/admin/views/add-user.client.view.html'
		}).
		state('admin/', {
			url: '/admin/',
			templateUrl: 'modules/admin/views/index.client.view.html'
		}).
		state('listUsers', {
			url: '/admin/users',
			templateUrl: 'modules/admin/views/list-users.client.view.html'
		}).
		state('editUser', {
			url: '/admin/users/:userId',
			templateUrl: 'modules/admin/views/edit-user.client.view.html'
		}).
		state('listPlans', {
			url: '/admin/plans',
			templateUrl: 'modules/admin/views/list-plans.client.view.html'
		}).
		state('addPlans', {
			url: '/admin/plans/new',
			templateUrl: 'modules/admin/views/add-plan.client.view.html'
		}).
		state('editPlan', {
			url: '/admin/plans/edit/:planId',
			templateUrl: 'modules/admin/views/edit-plan.client.view.html'
		});

		//$urlRouteProvider.
		//	when('/admin', {
		//		redirectTo: 'admin/login'
		//	});
	}
]);
