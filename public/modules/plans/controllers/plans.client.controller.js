'use strict';

// Plans controller
angular.module('plans').controller('PlansController', ['$scope', '$stateParams', '$location', 'Authentication', 'Plans',
	function($scope, $stateParams, $location, Authentication, Plans) {
		$scope.authentication = Authentication;

		$scope.pageAuth = function () {
			$scope.user = Authentication.user;
			if(!$scope.user) $location.path('/');
		};

		// Create new Plan
		$scope.create = function() {
			// Create new Plan object
			var plan = new Plans($scope.plan);

			// Redirect after save
			plan.$save(function(response) {
				$location.path('plans/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Plan
		$scope.remove = function(plan) {
			if (plan) {
				plan.$remove();

				for (var i in $scope.plans) {
					if ($scope.plans[i] === plan) {
						$scope.plans.splice(i, 1);
					}
				}
			} else {
				$scope.plan.$remove(function() {
					$location.path('plans');
				});
			}
		};

		// Update existing Plan
		$scope.update = function() {
			var plan = $scope.plan;

			plan.$update(function() {
				$location.path('plans/' + plan._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Plans
		$scope.find = function() {
			$scope.plans = Plans.query();
		};

		// Find existing Plan
		$scope.findOne = function() {
			$scope.plan = Plans.get({
				planId: $stateParams.planId
			});
		};
	}
]);
//
//angular.module('plans').directive('ngConfirmClick', [
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
