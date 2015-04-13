/**
 * Created by xlin on 6/04/15.
 */
'use strict';

angular.module('admin').factory('Contacts', ['$resource',
	function($resource) {
		return $resource('admin/contacts/:contactId', {
			userId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
