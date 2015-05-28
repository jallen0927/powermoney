'use strict';

// Gplans controller
angular.module('gplans').controller('GplansController', ['$scope', '$stateParams', '$location', 'Authentication', 'Gplans',
	function($scope, $stateParams, $location, Authentication, Gplans) {
		$scope.authentication = Authentication;

		$scope.pageAuth = function () {
			$scope.user = Authentication.user;
			if(!$scope.user) $location.path('/');
		};

		// Create new Gplan
		$scope.create = function() {
			// Create new Gplan object
			var gplan = new Gplans($scope.gplan);

			// Redirect after save
			gplan.$save(function(response) {
				$location.path('gplans/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Gplan
		$scope.remove = function(gplan) {
			if (gplan) {
				gplan.$remove();

				for (var i in $scope.gplans) {
					if ($scope.gplans[i] === gplan) {
						$scope.gplans.splice(i, 1);
					}
				}
			} else {
				$scope.gplan.$remove(function() {
					$location.path('gplans');
				});
			}
		};

		// Update existing Gplan
		$scope.update = function() {
			var gplan = $scope.gplan;

			gplan.$update(function() {
				$location.path('gplans/' + gplan._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Gplans
		$scope.find = function() {
			$scope.gplans = Gplans.query();
		};

		// Find existing Gplan
		$scope.findOne = function() {
			$scope.gplan = Gplans.get({
				gplanId: $stateParams.gplanId
			});
		};
	}
]);
//
//angular.module('gplans').directive('ngConfirmClick', [
//	function(){
//		return {
//			link: function (scope, element, attr) {
//				var msg = attr.ngConfirmClick || "Are you sure?";
//				var clickAction = attr.confirmedClick;
//				element.bind('click',function (event) {
//					if ( window.confirm(msg) ) {
//						scope.$eval(clickAction)
//					}
//				});
//			}
//		};
//	}
//]);
