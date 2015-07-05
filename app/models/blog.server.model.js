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
	title_cn: {
		type: String,
		default: '',
		trim: true,
		required: '请输入标题'
	},
	content: {
		type: String,
		default: ''
	},
	content_cn: {
		type: String,
		default: ''
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Blog', BlogSchema);
