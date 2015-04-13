/**
 * Created by xlin on 6/04/15.
 */
'use strict';

angular.module('admin').factory('Orders', ['$resource',
	function($resource) {
		return $resource('admin/orders/:orderId', {
			userId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
