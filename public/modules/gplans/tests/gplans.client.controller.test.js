'use strict';

(function() {
	// Gplans Controller Spec
	describe('Gplans Controller Tests', function() {
		// Initialize global variables
		var GplansController,
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

			// Initialize the Gplans controller.
			GplansController = $controller('GplansController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one gplan object fetched from XHR', inject(function(Gplans) {
			// Create sample gplan using the Gplans service
			var sampleGplan = new Gplans({
				title: 'An Gplan about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample gplans array that includes the new gplan
			var sampleGplans = [sampleGplan];

			// Set GET response
			$httpBackend.expectGET('gplans').respond(sampleGplans);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.gplans).toEqualData(sampleGplans);
		}));

		it('$scope.findOne() should create an array with one gplan object fetched from XHR using a gplanId URL parameter', inject(function(Gplans) {
			// Define a sample gplan object
			var sampleGplan = new Gplans({
				title: 'An Gplan about MEAN',
				content: 'MEAN rocks!'
			});

			// Set the URL parameter
			$stateParams.gplanId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/gplans\/([0-9a-fA-F]{24})$/).respond(sampleGplan);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.gplan).toEqualData(sampleGplan);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Gplans) {
			// Create a sample gplan object
			var sampleGplanPostData = new Gplans({
				title: 'An Gplan about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample gplan response
			var sampleGplanResponse = new Gplans({
				_id: '525cf20451979dea2c000001',
				title: 'An Gplan about MEAN',
				content: 'MEAN rocks!'
			});

			// Fixture mock form input values
			scope.title = 'An Gplan about MEAN';
			scope.content = 'MEAN rocks!';

			// Set POST response
			$httpBackend.expectPOST('gplans', sampleGplanPostData).respond(sampleGplanResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');

			// Test URL redirection after the gplan was created
			expect($location.path()).toBe('/gplans/' + sampleGplanResponse._id);
		}));

		it('$scope.update() should update a valid gplan', inject(function(Gplans) {
			// Define a sample gplan put data
			var sampleGplanPutData = new Gplans({
				_id: '525cf20451979dea2c000001',
				title: 'An Gplan about MEAN',
				content: 'MEAN Rocks!'
			});

			// Mock gplan in scope
			scope.gplan = sampleGplanPutData;

			// Set PUT response
			$httpBackend.expectPUT(/gplans\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/gplans/' + sampleGplanPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid gplanId and remove the gplan from the scope', inject(function(Gplans) {
			// Create new gplan object
			var sampleGplan = new Gplans({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new gplans array and include the gplan
			scope.gplans = [sampleGplan];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/gplans\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGplan);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.gplans.length).toBe(0);
		}));
	});
}());
