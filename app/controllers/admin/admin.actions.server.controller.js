/**
 * Created by xlin on 6/04/15.
 */
/**
 * Created by xlin on 6/04/15.
 */
'use strict';

var _ = require('lodash'),
	errorHandler = require('../errors.server.controller'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	moment = require('moment'),
	User = mongoose.model('User'),
	PowerPlan = mongoose.model('PowerPlan'),
	Blog = mongoose.model('Blog'),
	Contact = mongoose.model('Contact'),
	Order = mongoose.model('Order'),
	Product = mongoose.model('Product');

exports.addUser = function(req, res) {

//	delete req.body.roles;

	var user = new User(req.body);

	user.provider = 'local';
	user.displayName = user.firstName + ' ' + user.lastName;

	user.save(function(err){
		if(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			return res.status(200).end();
		}
	});
};

exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}

	next();
};

/**
 * List all users
 * @param req
 * @param res
 */
exports.listUsers = function(req, res){
	User.find().sort('-created').lean().exec(function(err, users) {
		if(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			for(var i= 0; i<users.length; i++) {
				users[i].password = undefined;
				users[i].salt = undefined;
				users[i].created = moment(users.created).format('YYYY-MM-DD');
			}

			res.json(users);
		}
	});
};

exports.editUser = function(req, res) {
	res.json(req.body);
};

// For power plans
exports.addPlan = function(req, res) {
	var powerPlan = new PowerPlan(req.body);

	powerPlan.save(function(err){
		if(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		return res.status(200).end();
	});
};

exports.listPlans = function(req, res){
	PowerPlan.find().sort('-created').lean().exec(function(err, plans) {
		if(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(plans);
		}
	});
};

exports.editPlan = function(req, res) {
	res.json(req.body);
};

// For Blogs
exports.addBlog = function(req, res) {
	var blog = new Blog(req.body);

	blog.save(function(err){
		if(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		return res.status(200).end();
	});
};

exports.listBlogs = function(req, res){
	Blog.find().sort('-created').lean().exec(function(err, blogs) {
		if(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(blogs);
		}
	});
};

exports.editBlog = function(req, res) {
	res.json(req.body);
};


// For Products
exports.addProduct = function(req, res) {
	var product = new Product(req.body);

	product.save(function(err){
		if(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		return res.status(200).end();
	});
};

exports.listProducts = function(req, res){
	Product.find().sort('-created').lean().exec(function(err, products) {
		if(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(products);
		}
	});
};

exports.editProduct = function(req, res) {
	res.json(req.body);
};

// For Orders
exports.addOrder = function(req, res) {
	var order = new Order(req.body);

	order.save(function(err){
		if(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		return res.status(200).end();
	});
};

exports.listOrders = function(req, res){
	Order.find().sort('-created').lean().exec(function(err, orders) {
		if(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(orders);
		}
	});
};

exports.markOrder = function(req, res) {
	res.json(req.body);
};

// For Contacts
exports.addContact = function(req, res) {
	var contact = new Contact(req.body);

	contact.save(function(err){
		if(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		return res.status(200).end();
	});
};

exports.listContacts = function(req, res){
	Contact.find().sort('-created').lean().exec(function(err, contacts) {
		if(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(contacts);
		}
	});
};
