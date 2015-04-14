'use strict';

//Orders service used for communicating with the orders REST endpoints
angular.module('orders').factory('Orders', ['$resource',
	function($resource) {
		return $resource('orders/:orderId', {
			orderId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
