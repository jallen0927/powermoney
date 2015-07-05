'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$rootScope',
	function($scope, $rootScope, Authentication ) {

        // Define language
        $rootScope.language = $rootScope.language || 'en';

        $scope.setLanguage = function(language) {
            $rootScope.language = language;
        };
	}
]);
