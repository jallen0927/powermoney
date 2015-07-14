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

angular.module('blogs').service('TestBlog',
    function () {
        var blog = {
            title: {
                en: 'English Title',
                cn: '中文标题'
            },
            content: {
                en: 'English Content',
                cn: '中文内容'
            },
            created: Date.now
        };

        return blog;
    }

);
