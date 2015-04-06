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
 * PowerCompany Schema
 */
var PowerCompanySchema = new Schema({
	name: {
		type: String,
		default: '',
		trim: true,
		required: 'Company name cannot be blank'
	},
	special: {
		type: String,
		default: '无',
		trim: true
	}
});

mongoose.model('PowerCompany', PowerCompanySchema);
