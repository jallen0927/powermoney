'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'AdminAuthentication', 'Menus',
	function($scope, AdminAuthentication, Menus) {
		$scope.authentication = AdminAuthentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
