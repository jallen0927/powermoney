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
			enum: ['Mr', 'Miss', 'Mrs', 'Ms', 'Dr', 'Rev']
		}],
		default: ['Mr'],
		trim: true,
		required: 'Title cannot be blank'
	},
	firstName: {
		type: String,
		default: '',
		trim: true,
		required: 'First name cannot be blank'
	},
	lastName: {
		type: String,
		default: '',
		trim: true,
		required: 'Last name cannot be blank'
	},
	phone: {
		type: String,
		default: '',
		trim: true,
		required: 'Phone cannot be blank'
	},
	email: {
		type: String,
		default: '',
		trim: true,
		required: 'Email cannot be blank'
	},
	license: {
		type: String,
		default: '',
		trim: true,
		required: 'License cannot be blank'
	},
	version: {
		type: String,
		default: '',
		trim: true,
		required: 'License Version cannot be blank'
	},
	dateOfBirth: {
		type: Date,
		default: Date.now(),
		trim: true,
		required: 'Data of Birth cannot be blank'
	},
	address: {
		type: String,
		default: '',
		trim: true,
		required: 'Property address cannot be blank'
	},
	primary: {
		type: String,
		default: '',
		trim: true,
		required: 'Please fill all the fields'
	},
	services: {
		type: String,
		default: '',
		trim: true,
		required: 'Please fill all the fields'
	},
	people: {
		type: String,
		default: '',
		trim: true,
		required: 'Please fill all the fields'
	},
	situation: {
		type: String,
		default: '',
		trim: true,
		required: 'Please fill all the fields'
	},
	prevent: {
		type: String,
		default: '',
		trim: true,
		required: 'Please fill all the fields'
	},
	medical: {
		type: String,
		default: '',
		trim: true,
		required: 'Please fill all the fields'
	},
	threat: {
		type: String,
		default: '',
		trim: true,
		required: 'Please fill all the fields'
	},
    billingSame: {
        type: String,
        default: '',
        trim: true,
        required: 'Please fill all the fields'
    },
    planType: {
        type: String,
        default: '',
        trim: true
    },
	planId: {
		type: String,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Order', OrderSchema);
