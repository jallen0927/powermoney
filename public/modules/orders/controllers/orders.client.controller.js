'use strict';

// Orders controller
angular.module('orders').controller('OrdersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Orders',
	function($scope, $stateParams, $location, Authentication, Orders) {
		$scope.authentication = Authentication;

		// Create new Order
		$scope.create = function() {
			// Create new Order object
			var submitOrder = $scope.order;
			submitOrder.medical = (submitOrder.medical === "Yes");
			submitOrder.hazards = (submitOrder.hazards === "Yes");

			var order = new Orders($scope.order);

			// Redirect after save
			order.$save(function(response) {
				//$location.path('orders/' + response._id);
				$scope.success = true;
			}, function(errorResponse) {
				$scope.error = errorResponse.date.message;
			});
		};

		// Remove existing Order
		$scope.remove = function(order) {
			if (order) {
				order.$remove();

				for (var i in $scope.orders) {
					if ($scope.orders[i] === order) {
						$scope.orders.splice(i, 1);
					}
				}
			} else {
				$scope.order.$remove(function() {
					$location.path('orders');
				});
			}
		};

		// Update existing Order
		$scope.update = function() {
			var order = $scope.order;

			order.$update(function() {
				$location.path('orders/' + order._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.date.message;
			});
		};

		// Find a list of Orders
		$scope.find = function() {
			$scope.orders = Orders.query();
		};

		// Find existing Order
		$scope.findOne = function() {
			$scope.order = Orders.get({
				orderId: $stateParams.orderId
			});
		};

		// Datepicker

		$scope.dateOfBirth_open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.dateOfBirth_opened = true;
		};

		$scope.jointDob_open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.jointDob_opened = true;
		};
	}
]);
