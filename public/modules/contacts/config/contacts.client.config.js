'use strict';

// Configuring the Contacts module
angular.module('contacts').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Contacts', 'contacts', 'dropdown', '/contacts(/create)?');
		Menus.addSubMenuItem('topbar', 'contacts', 'List Contacts', 'contacts');
		Menus.addSubMenuItem('topbar', 'contacts', 'New Contact', 'contacts/create');
	}
]);
