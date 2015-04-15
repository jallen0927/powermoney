/**
 * Created by xlin on 5/04/15.
 */
'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var OrderSchema = new Schema({
	title: {
		type: [{
			type: String,
			enum: ['Mr', 'Miss', 'Mrs', 'Ms', 'Dr']
		}],
		default: ['Mr'],
		trim: true,
		required: 'Title cannot be blank'
	},
	firstName: {
		type: String,
		default: '',
		trim: true,
		required: 'firstName cannot be blank'
	},
	LastName: {
		type: String,
		default: '',
		trim: true,
		required: 'LastName cannot be blank'
	},
	dataOfBirth: {
		type: Date,
		default: Date.now(),
		trim: true
	},
	driver5a: {
		type: String,
		default: '',
		trim: true
	},
	driver5b: {
		type: String,
		default: '',
		trim: true
	},
	mobile: {
		type: String,
		default: '',
		trim: true
	},
	homeNumber: {
		type: String,
		default: '',
		trim: true
	},
	workNumber: {
		type: String,
		default: '',
		trim: true
	},
	email: {
		type: String,
		default: '',
		trim: true
	},
	jointName: {
		type: String,
		default: '',
		trim: true
	},
	jointDob: {
		type: String,
		default: '',
		trim: true
	},
	altName: {
		type: String,
		default: '',
		trim: true
	},
	altPhone: {
		type: String,
		default: '',
		trim: true
	},
	authPerson: {
		type: String,
		default: '',
		trim: true
	},
	currentCompany: {
		type: String,
		default: '',
		trim: true
	},
	medical: {
		type: Boolean,
		default: false,
		trim: true
	},
	electrMeter: {
		type: String,
		default: '',
		trim: true
	},
	gasMeter: {
		type: String,
		default: '',
		trim: true
	},
	lpgBottles: {
		type: String,
		default: '',
		trim: true
	},
	hazards: {
		type: Boolean,
		default: false,
		trim: true
	},
	payment: {
		type: [{
			type: String,
			enum: ['Direct Debit', 'Manual Online Payment', 'Credit Card', 'PostShop', 'FreePost', 'Phone Banking', 'SmoothPay']
		}],
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Order', OrderSchema);
