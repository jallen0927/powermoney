'use strict';
//angular.module('core').controller('HomeController', ['$scope', 'Authentication',
//	function($scope, Authentication) {
//		// This provides Authentication context.
//		$scope.authentication = Authentication;
//	}
//]);

angular.module('core').controller('PubController', ['$scope', '$http',
	function($scope, $http) {

		$scope.init = function() {
			var autoComplete,
				addressField = document.getElementById('address');
			autoComplete = new google.maps.places.Autocomplete(
				/** @type {HTMLInputElement} */
				addressField,
				{ types: ['geocode'] });
			// When the user selects an address from the dropdown,
			// populate the address fields in the form.
			google.maps.event.addListener(autoComplete, 'place_changed', function() {
				$scope.entry.googlePlace = autoComplete.getPlace();
			});
		};

		$scope.comparePlan = function() {

			$http.get('/plans').success(function(plans){
				for(var i=0; i<plans.length; i++) {
					plans[i].result = calResult(plans[i]).toFixed(2);
					plans[i].result = parseFloat(plans[i].result);
				}

				$scope.plans = plans;
				$scope.showResult = true;
			}).error(function(response){
				$scope.error = response.error;
			});

			function calFun(a, b, c, x) {
				var P;
				P = (a * 30 + b * x) * 1.15 * (1 + c);

				return P;
			}

			function calResult(plan) {
				var a = parseFloat(plan.fixed) / 100.0,
					b = parseFloat(plan.rate) / 100.0,
					c = parseFloat(plan.discount) / 100.0,
					x = parseFloat($scope.entry.amount) / 1.0;

				return calFun(a, b, c, x);
			}

		};

		$scope.goBack = function() {
			$scope.showResult = false;
		};

		//$scope.reset = function() {
		//	$scope.entry = undefined;
		//};
	}

]);
