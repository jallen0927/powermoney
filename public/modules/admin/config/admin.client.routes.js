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
			url: '/admin/adduser',
			templateUrl: 'modules/admin/views/add-user.client.view.html'
		}).
		state('admin/', {
			url: '/admin/',
			templateUrl: 'modules/admin/views/index.client.view.html'
		}).
		state('users', {
			url: '/admin/users',
			templateUrl: 'modules/admin/views/list-users.client.view.html'
		}).
		state('editUser', {
			url: '/admin/users/:userId',
			templateUrl: 'modules/admin/views/edit-user.client.view.html'
		});

		//$urlRouteProvider.
		//	when('/admin', {
		//		redirectTo: 'admin/login'
		//	});
	}
]);
