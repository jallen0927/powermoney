'use strict';

(function() {
	// Products Controller Spec
	describe('Products Controller Tests', function() {
		// Initialize global variables
		var ProductsController,
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

			// Initialize the Products controller.
			ProductsController = $controller('ProductsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one product object fetched from XHR', inject(function(Products) {
			// Create sample product using the Products service
			var sampleProduct = new Products({
				title: 'An Product about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample products array that includes the new product
			var sampleProducts = [sampleProduct];

			// Set GET response
			$httpBackend.expectGET('products').respond(sampleProducts);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.products).toEqualData(sampleProducts);
		}));

		it('$scope.findOne() should create an array with one product object fetched from XHR using a productId URL parameter', inject(function(Products) {
			// Define a sample product object
			var sampleProduct = new Products({
				title: 'An Product about MEAN',
				content: 'MEAN rocks!'
			});

			// Set the URL parameter
			$stateParams.productId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/products\/([0-9a-fA-F]{24})$/).respond(sampleProduct);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.product).toEqualData(sampleProduct);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Products) {
			// Create a sample product object
			var sampleProductPostData = new Products({
				title: 'An Product about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample product response
			var sampleProductResponse = new Products({
				_id: '525cf20451979dea2c000001',
				title: 'An Product about MEAN',
				content: 'MEAN rocks!'
			});

			// Fixture mock form input values
			scope.title = 'An Product about MEAN';
			scope.content = 'MEAN rocks!';

			// Set POST response
			$httpBackend.expectPOST('products', sampleProductPostData).respond(sampleProductResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');

			// Test URL redirection after the product was created
			expect($location.path()).toBe('/products/' + sampleProductResponse._id);
		}));

		it('$scope.update() should update a valid product', inject(function(Products) {
			// Define a sample product put data
			var sampleProductPutData = new Products({
				_id: '525cf20451979dea2c000001',
				title: 'An Product about MEAN',
				content: 'MEAN Rocks!'
			});

			// Mock product in scope
			scope.product = sampleProductPutData;

			// Set PUT response
			$httpBackend.expectPUT(/products\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/products/' + sampleProductPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid productId and remove the product from the scope', inject(function(Products) {
			// Create new product object
			var sampleProduct = new Products({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new products array and include the product
			scope.products = [sampleProduct];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/products\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleProduct);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.products.length).toBe(0);
		}));
	});
}());
