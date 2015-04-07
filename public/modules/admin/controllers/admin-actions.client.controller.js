/**
 * Created by xlin on 6/04/15.
 */

'use strict';

angular.module('admin').controller('AdminActionController', ['$scope', '$http', '$location', 'AdminAuthentication', 'AdminUsers',
	function($scope, $http, $location, AdminAuthentication, AdminUsers) {
		$scope.authentication = AdminAuthentication;

		// If user isn't signed in then redirect login
		//if (!$scope.authentication.user) $location.path('/admin/login');

		$scope.addUser = function() {
			$http.post('/admin/addUser', $scope.credentials).success(function(){
				$location.path('/admin/users');
			}).error(function(response){
				$scope.error = response.message;
			});
		};

		$scope.findUsers = function() {
			var _adminUsers = AdminUsers.query();

			$scope.adminUsers = _adminUsers;
		};

		$scope.addPlan = function() {
			$http.post('/admin/addPlan', $scope.plan).success(function(){
				$location.path('/admin/plans');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

	}

]);
