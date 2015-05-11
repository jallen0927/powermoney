'use strict';

// Configuring the Gplans module
angular.module('gplans').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Gplans', 'gplans', 'dropdown', '/gplans(/create)?');
		Menus.addSubMenuItem('topbar', 'gplans', 'List Gplans', 'gplans');
		Menus.addSubMenuItem('topbar', 'gplans', 'New Gplan', 'gplans/create');
	}
]);
