'use strict';

//Contacts service used for communicating with the contacts REST endpoints
angular.module('contacts').factory('Contacts', ['$resource',
	function($resource) {
		return $resource('contacts/:contactId', {
			contactId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
