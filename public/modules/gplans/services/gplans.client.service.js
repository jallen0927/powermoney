'use strict';

//Gplans service used for communicating with the gplans REST endpoints
angular.module('gplans').factory('Gplans', ['$resource',
	function($resource) {
		return $resource('gplans/:gplanId', {
			gplanId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
