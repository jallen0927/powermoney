'use strict';

(function() {
	// Orders Controller Spec
	describe('Orders Controller Tests', function() {
		// Initialize global variables
		var OrdersController,
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

			// Initialize the Orders controller.
			OrdersController = $controller('OrdersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one order object fetched from XHR', inject(function(Orders) {
			// Create sample order using the Orders service
			var sampleOrder = new Orders({
				title: 'An Order about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample orders array that includes the new order
			var sampleOrders = [sampleOrder];

			// Set GET response
			$httpBackend.expectGET('orders').respond(sampleOrders);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.orders).toEqualData(sampleOrders);
		}));

		it('$scope.findOne() should create an array with one order object fetched from XHR using a orderId URL parameter', inject(function(Orders) {
			// Define a sample order object
			var sampleOrder = new Orders({
				title: 'An Order about MEAN',
				content: 'MEAN rocks!'
			});

			// Set the URL parameter
			$stateParams.orderId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/orders\/([0-9a-fA-F]{24})$/).respond(sampleOrder);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.order).toEqualData(sampleOrder);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Orders) {
			// Create a sample order object
			var sampleOrderPostData = new Orders({
				title: 'An Order about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample order response
			var sampleOrderResponse = new Orders({
				_id: '525cf20451979dea2c000001',
				title: 'An Order about MEAN',
				content: 'MEAN rocks!'
			});

			// Fixture mock form input values
			scope.title = 'An Order about MEAN';
			scope.content = 'MEAN rocks!';

			// Set POST response
			$httpBackend.expectPOST('orders', sampleOrderPostData).respond(sampleOrderResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');

			// Test URL redirection after the order was created
			expect($location.path()).toBe('/orders/' + sampleOrderResponse._id);
		}));

		it('$scope.update() should update a valid order', inject(function(Orders) {
			// Define a sample order put data
			var sampleOrderPutData = new Orders({
				_id: '525cf20451979dea2c000001',
				title: 'An Order about MEAN',
				content: 'MEAN Rocks!'
			});

			// Mock order in scope
			scope.order = sampleOrderPutData;

			// Set PUT response
			$httpBackend.expectPUT(/orders\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/orders/' + sampleOrderPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid orderId and remove the order from the scope', inject(function(Orders) {
			// Create new order object
			var sampleOrder = new Orders({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new orders array and include the order
			scope.orders = [sampleOrder];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/orders\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleOrder);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.orders.length).toBe(0);
		}));
	});
}());
