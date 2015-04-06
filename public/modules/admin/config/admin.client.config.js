/**
 * Created by xlin on 6/04/15.
 */
'use strict';

angular.module('admin').config(['$resourceProvider', function($resourceProvider) {

	$resourceProvider.defaults.stripeTrailingSlashes = true;
}]);
