'use strict';

// Authentication service for user variables
angular.module('admin').factory('AdminAuthentication', ['$window', function($window) {
	var auth = {
		user: $window.user
	};

	return auth;
}]);
