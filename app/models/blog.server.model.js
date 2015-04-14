/**
 * Created by xlin on 5/04/15.
 */
'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var BlogSchema = new Schema({
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	content: {
		type: String,
		default: ''
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Blog', BlogSchema);