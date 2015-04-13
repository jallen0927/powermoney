/**
 * Created by xlin on 6/04/15.
 */
'use strict';

angular.module('admin').factory('AdminUsers', ['$resource',
	function($resource) {
		return $resource('admin/users/:userId', {
			userId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
