'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
		state('listBlog', {
			url: '/blogs',
			templateUrl: 'modules/core/views/list.blogs.client.view.html'
		}).
		state('listProducts', {
			url: '/products',
			templateUrl: 'modules/core/views/list.products.client.view.html'
		});
	}
]);
