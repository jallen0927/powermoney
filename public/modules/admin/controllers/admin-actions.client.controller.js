/**
 * Created by xlin on 6/04/15.
 */

'use strict';

angular.module('admin').controller('AdminActionController', ['$scope', '$http', '$location', 'AdminAuthentication', 'AdminUsers',
	function($scope, $http, $location, AdminAuthentication, AdminUsers) {
		$scope.authentication = AdminAuthentication;

		// If user isn't signed in then redirect login
		//if (!$scope.authentication.user) $location.path('/admin/login');

		$scope.adduser = function() {
			$http.post('/admin/adduser', $scope.credentials).success(function(response){
				$location.path('/admin/users');
			}).error(function(response){
				$scope.error = response.message;
			});
		};

		$scope.find = function() {
			var _adminUsers = AdminUsers.query();

			$scope.adminUsers = _adminUsers;
		};
	}

]);
