/**
 * Created by xlin on 3/04/15.
 */
'use strict';

//Setting up route
angular.module('powers').config(['$stateProvider',
	function($stateProvider){
		// Powers state routing
		$stateProvider.
		state('comparePowers', {
			url: '/power/compare',
			templateUrl: 'modules/powers/views/compare-powers.client.view.html'
		}).
		state('signupPowers', {
			url: '/power/signup',
			templateUrl: 'modules/powers/views/signup-powers.client.view.html'
		}).
		state('hardwarePowers', {
			url: '/power/hardware',
			templateUrl: 'modules/powers/views/hardware-powers.client.view.html'
		}).
		state('blogPowers', {
			url: '/power/blog',
			templateUrl: 'modules/powers/views/blog-powers.client.view.html'
		}).
		state('aboutusPowers', {
			url: '/power/aboutus',
			templateUrl: 'modules/powers/views/aboutus-powers.client.view.html'
		}).
		state('contactusPowers', {
			url: '/power/contactus',
			templateUrl: 'modules/powers/views/contactus-powers.client.view.html'
		});
	}
]);
