/**
 * Created by xlin on 4/04/15.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Power Schema
 * @type {*|Schema}
 */
var PowerSchema = new Schema({
	name: {
		type: String,
		default: '',
		trim: true,
		required: 'Company name cannot be blank'
	},
	discount: {

	},
	special: {

	}
});

mongoose.model('Power', PowerSchema);
