'use strict';

// Setting up route
angular.module('gplans').config(['$stateProvider',
	function($stateProvider) {
		// Gplans state routing
		$stateProvider.
		state('listGplans', {
			url: '/gplans',
			templateUrl: 'modules/gplans/views/list-gplans.client.view.html'
		}).
		state('createGplan', {
			url: '/gplans/create',
			templateUrl: 'modules/gplans/views/create-gplan.client.view.html'
		}).
		state('viewGplan', {
			url: '/gplans/:gplanId',
			templateUrl: 'modules/gplans/views/view-gplan.client.view.html'
		}).
		state('editGplan', {
			url: '/gplans/:gplanId/edit',
			templateUrl: 'modules/gplans/views/edit-gplan.client.view.html'
		});
	}
]);
