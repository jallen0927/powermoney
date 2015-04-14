'use strict';

(function() {
	// Contacts Controller Spec
	describe('Contacts Controller Tests', function() {
		// Initialize global variables
		var ContactsController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Contacts controller.
			ContactsController = $controller('ContactsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one contact object fetched from XHR', inject(function(Contacts) {
			// Create sample contact using the Contacts service
			var sampleContact = new Contacts({
				title: 'An Contact about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample contacts array that includes the new contact
			var sampleContacts = [sampleContact];

			// Set GET response
			$httpBackend.expectGET('contacts').respond(sampleContacts);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.contacts).toEqualData(sampleContacts);
		}));

		it('$scope.findOne() should create an array with one contact object fetched from XHR using a contactId URL parameter', inject(function(Contacts) {
			// Define a sample contact object
			var sampleContact = new Contacts({
				title: 'An Contact about MEAN',
				content: 'MEAN rocks!'
			});

			// Set the URL parameter
			$stateParams.contactId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/contacts\/([0-9a-fA-F]{24})$/).respond(sampleContact);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.contact).toEqualData(sampleContact);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Contacts) {
			// Create a sample contact object
			var sampleContactPostData = new Contacts({
				title: 'An Contact about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample contact response
			var sampleContactResponse = new Contacts({
				_id: '525cf20451979dea2c000001',
				title: 'An Contact about MEAN',
				content: 'MEAN rocks!'
			});

			// Fixture mock form input values
			scope.title = 'An Contact about MEAN';
			scope.content = 'MEAN rocks!';

			// Set POST response
			$httpBackend.expectPOST('contacts', sampleContactPostData).respond(sampleContactResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');

			// Test URL redirection after the contact was created
			expect($location.path()).toBe('/contacts/' + sampleContactResponse._id);
		}));

		it('$scope.update() should update a valid contact', inject(function(Contacts) {
			// Define a sample contact put data
			var sampleContactPutData = new Contacts({
				_id: '525cf20451979dea2c000001',
				title: 'An Contact about MEAN',
				content: 'MEAN Rocks!'
			});

			// Mock contact in scope
			scope.contact = sampleContactPutData;

			// Set PUT response
			$httpBackend.expectPUT(/contacts\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/contacts/' + sampleContactPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid contactId and remove the contact from the scope', inject(function(Contacts) {
			// Create new contact object
			var sampleContact = new Contacts({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new contacts array and include the contact
			scope.contacts = [sampleContact];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/contacts\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleContact);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.contacts.length).toBe(0);
		}));
	});
}());
