/**
 * Created by xlin on 6/04/15.
 */
'use strict';

angular.module('admin').factory('Products', ['$resource',
	function($resource) {
		return $resource('admin/products/:productId', {
			userId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
