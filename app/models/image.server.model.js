/**
 * Created by xlin on 6/04/15.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Image Schema
 */
var ImageSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	url: {
		type: String,
		default: '',
		trim: true
	}
});

mongoose.model('Image', ImageSchema);
