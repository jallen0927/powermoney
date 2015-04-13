/**
 * Created by xlin on 6/04/15.
 */
'use strict';

angular.module('admin').factory('Blogs', ['$resource',
	function($resource) {
		return $resource('admin/blogs/:blogId', {
			userId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
