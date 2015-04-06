/**
 * Created by xlin on 6/04/15.
 */
'use strict';

angular.module('admin').config(['$stateProvider',
	function($stateProvider) {

		$stateProvider.
		state('login', {
			url: '/admin/login',
			templateUrl: 'modules/admin/views/login.client.view.html'
		}).
		state('adduser', {
			url: '/admin/adduser',
			templateUrl: 'modules/admin/views/add-user.client.view.html'
		});
		//state('admin', {
		//		redirectTo: '/admin/login'
		//	});

		//$urlRouteProvider.
		//	when('/admin', {
		//		redirectTo: 'admin/login'
		//	});
	}
]);
