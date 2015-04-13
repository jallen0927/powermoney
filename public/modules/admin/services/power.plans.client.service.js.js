/**
 * Created by xlin on 6/04/15.
 */
'use strict';

angular.module('admin').factory('PowerPlans', ['$resource',
	function($resource) {
		return $resource('admin/plans/:planId', {
			userId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
