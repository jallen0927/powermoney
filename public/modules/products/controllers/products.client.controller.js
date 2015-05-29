'use strict';

// Products controller
angular.module('products').controller('ProductsController', ['$scope', '$stateParams', '$location', '$http', 'Authentication', 'Products', 'Upload',
	function($scope, $stateParams, $location, $http, Authentication, Products, Upload) {
		$scope.authentication = Authentication;

		$scope.pageAuth = function () {
			$scope.user = Authentication.user;
			if(!$scope.user) $location.path('/');
		};

		// Create new Product
		$scope.create = function() {
			// Create new Product object
			var product = new Products({
				title: this.title,
				content: this.content
			});

			// Redirect after save
			product.$save(function(response) {
				$location.path('products/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Product
		$scope.remove = function(product) {
			if (product) {
				product.$remove();

				for (var i in $scope.products) {
					if ($scope.products[i] === product) {
						$scope.products.splice(i, 1);
					}
				}
			} else {
				$scope.product.$remove(function() {
					$location.path('products');
				});
			}
		};

		// Update existing Product
		$scope.update = function() {
			var product = $scope.product;

			product.$update(function() {
				$location.path('products/' + product._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Products
		$scope.find = function() {
			$scope.products = Products.query();
		};

		// Find existing Product
		$scope.findOne = function() {
			$scope.product = Products.get({
				productId: $stateParams.productId
			});
		};

		// Find all gallery images
		$scope.findGalleryImages = function() {
			var galleries = [
				{'name': 'gallery1'},
				{'name': 'gallery2'}
			];

			for (var i=0; i<galleries.length; i++) {
				(function(galleries, i) {
					$http.get('/galleries/' + galleries[i].name).success(function(images){
						galleries[i].images = images;
						$scope.galleries = galleries;
					}).error(function(response) {
						$scope.error = response.message;
					});
				})(galleries, i);
			}
		};


		//Handle image upload
		$scope.$watch('product.image', function () {
			$scope.upload($scope.image);
		});

		$scope.upload = function (image) {
			if (image && image.length) {
				Upload.upload({
					url: '',
					fields: {
						'product': $scope.product.name
					},
					file: image
				}).progress(function(e){

				});
			}
		};

	}
]);
