/**
 * Created by xlin on 5/04/15.
 */
'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var CategorySchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Title cannot be blank',
		trim: true
	}
});

mongoose.model('Category', CategorySchema);
