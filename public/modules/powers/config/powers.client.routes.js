/**
 * Created by xlin on 3/04/15.
 */
'use strict';

//Setting up route
angular.module('powers').config(['$stateProvider',
	function($stateProvider){
		// PM state routing
		$stateProvider.state('profile', {
			url: '/power/compare',
			templateUrl: 'modules/pm/views/power-compare.client.view.html'
		});
	}
]);
