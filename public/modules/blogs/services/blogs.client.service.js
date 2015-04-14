'use strict';

//Blogs service used for communicating with the blogs REST endpoints
angular.module('blogs').factory('Blogs', ['$resource',
	function($resource) {
		return $resource('blogs/:blogId', {
			blogId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
