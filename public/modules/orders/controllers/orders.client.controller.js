'use strict';

// Orders controller
angular.module('orders').controller('OrdersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Orders', 'Plans', 'Gplans',
	function($scope, $stateParams, $location, Authentication, Orders, Plans, Gplans) {
		$scope.authentication = Authentication;

		$scope.pageAuth = function () {
			$scope.user = Authentication.user;
			if(!$scope.user) $location.path('/');
		};

		$scope.init = function() {
			var routeParams = $location.search();
			$scope.order = {};

			if (routeParams.hasOwnProperty('gplan')) {$scope.order.planType = 'gplan'; $scope.order.planId = routeParams.gplan;}
			if (routeParams.hasOwnProperty('plan')) {$scope.order.planType = 'plan'; $scope.order.planId = routeParams.plan;}
		};

		// Create new Order
		$scope.create = function() {
			// Create new Order object
			var submitOrder = $scope.order;
			submitOrder.medical = (submitOrder.medical === 'Yes');
			submitOrder.hazards = (submitOrder.hazards === 'Yes');

			var order = new Orders($scope.order);

			// Redirect after save
			order.$save(function(response) {
				//$location.path('orders/' + response._id);
				$scope.success = true;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
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
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Orders
		$scope.find = function() {
			$scope.orders = Orders.query({}, function(orders){
                for (var i=0; i<orders.length; i++) {
                    $scope.getOrderPlan(orders[i]);
                }

            });
		};

		// Find existing Order
		$scope.findOne = function() {
			$scope.order = Orders.get({
				orderId: $stateParams.orderId
			}, $scope.getOrderPlan);

		};

		$scope.getOrderPlan = function (order) {
			if(order.planType === 'plan') {
				order.type = 'Power Plan';
				order.plan = Plans.get({
					planId: order.planId
				});
			} else if (order.planType === 'gplan') {
				order.type = 'Gas Plan';
				order.plan = Gplans.get({
					planId: order.planId
				});
			}
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
