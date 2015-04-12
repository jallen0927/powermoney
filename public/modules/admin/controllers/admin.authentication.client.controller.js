/**
 * Created by xlin on 6/04/15.
 */
'use strict';

angular.module('admin').controller('AdminAuthenticationController', ['$scope', '$http', '$location', 'AdminAuthentication',
	function($scope, $http, $location, AdminAuthentication) {
		$scope.authentication = AdminAuthentication;

		if ($scope.authentication.user) $location.path('/admin');

		$scope.login = function() {
			$http.post('/admin/auth', $scope.credentials).success(function (response) {
				$scope.authentication.user = response;

				$location.path('/admin');
			}).error(function(response){
				$scope.error = response.message;
			});
		};
	}
]);
