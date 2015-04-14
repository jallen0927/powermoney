'use strict';

// Blogs controller
angular.module('blogs').controller('BlogsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Blogs',
	function($scope, $stateParams, $location, Authentication, Blogs) {
		$scope.authentication = Authentication;

		// Create new Blog
		$scope.create = function() {
			// Create new Blog object
			var blog = new Blogs({
				title: this.title,
				content: this.content
			});

			// Redirect after save
			blog.$save(function(response) {
				$location.path('blogs/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Blog
		$scope.remove = function(blog) {
			if (blog) {
				blog.$remove();

				for (var i in $scope.blogs) {
					if ($scope.blogs[i] === blog) {
						$scope.blogs.splice(i, 1);
					}
				}
			} else {
				$scope.blog.$remove(function() {
					$location.path('blogs');
				});
			}
		};

		// Update existing Blog
		$scope.update = function() {
			var blog = $scope.blog;

			blog.$update(function() {
				$location.path('blogs/' + blog._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Blogs
		$scope.find = function() {
			$scope.blogs = Blogs.query();
		};

		// Find existing Blog
		$scope.findOne = function() {
			$scope.blog = Blogs.get({
				blogId: $stateParams.blogId
			});
		};

		// To trim string
		$scope.trimContent = function(str, maxLength) {
			var trimmedStr = str.substring(0, maxLength);
			trimmedStr = trimmedStr.substr(0, Math.min(trimmedStr.length, trimmedStr.lastIndexOf(" ")));

			return trimmedStr + '......';
		}
	}
]);

angular.module('blogs').directive('ngConfirmClick', [
	function(){
		return {
			link: function (scope, element, attr) {
				var msg = attr.ngConfirmClick || "Are you sure?";
				var clickAction = attr.confirmedClick;
				element.bind('click',function (event) {
					if ( window.confirm(msg) ) {
						scope.$eval(clickAction)
					}
				});
			}
		};
	}
]);
