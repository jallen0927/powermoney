'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$translate', 'Authentication', 'Menus',
	function($scope, $translate, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

        // Define language
        //$rootScope.language = $rootScope.language || 'en';

        $scope.setLanguage = function(language) {
            //$rootScope.language = language;
            //console.log($rootScope.language);
            $translate.use(language);
        };
	}
]);
