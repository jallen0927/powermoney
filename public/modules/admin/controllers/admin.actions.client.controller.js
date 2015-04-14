/**
 * Created by xlin on 6/04/15.
 */

'use strict';

angular.module('admin').controller('AdminActionController', [
	'$scope',
	'$http',
	'$location',
	'$stateParams',
	'AdminAuthentication',
	'AdminUsers',
	'PowerPlans',
	'Blogs',
	'Contacts',
	'Orders',
	'Products',
	function($scope, $http, $location, $stateParams, AdminAuthentication, AdminUsers, PowerPlans, Blogs, Contacts, Orders, Products) {
		$scope.authentication = AdminAuthentication;

		// If user isn't signed in then redirect login
		//if (!$scope.authentication.user) $location.path('/admin/login');
		//$scope.editorOptions = {
		//	language: 'en',
		//	uiColor: '#000000'
		//};

		$scope.addUser = function() {
			$http.post('/admin/addUser', $scope.credentials).success(function(){
				$location.path('/admin/users');
			}).error(function(response){
				$scope.error = response.message;
			});
		};

		$scope.findUsers = function() {
			var _adminUsers = AdminUsers.query();
			$scope.adminUsers = _adminUsers;
		};
// for power plans
		$scope.addPlan = function() {
			$http.post('/admin/addPlan', $scope.plan).success(function(){
				$location.path('/admin/plans');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.findPlans = function() {
			var _powerPlans = PowerPlans.query();
			$scope.powerPlans = _powerPlans;
		};

		$scope.findPlan = function() {
			$scope.plan = PowerPlans.get({
				planId: $stateParams.planId
			});
		};

		// for blogs
		$scope.addBlog = function() {
			$http.post('/admin/addBlog', $scope.blog).success(function(){
				$location.path('/admin/blogs');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.findBlogs = function() {
			var _blogs = Blogs.query();
			$scope.blogs = _blogs;
		};

		//for products
		$scope.addProduct = function() {
			$http.post('/admin/addProduct', $scope.product).success(function(){
				$location.path('/admin/products');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.findProducts = function() {
			var _products = Products.query();
			$scope.products = _products;
		};

		//for orders
		$scope.addOrder = function() {
			$http.post('/admin/addOrder', $scope.order).success(function(){
				$location.path('/admin/orders');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.findOrders = function() {
			var _orders = Orders.query();
			$scope.orders = _orders;
		};

		//for contacts
		$scope.addContact = function() {
			$http.post('/admin/addContact', $scope.contact).success(function(){
				$location.path('/admin/contacts');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.findContacts = function() {
			var _contacts = Contacts.query();
			$scope.contacts = _contacts;
		};
	}

]);
