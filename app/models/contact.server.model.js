/**
 * Created by xlin on 5/04/15.
 */
'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ContactSchema = new Schema({
	name: {
		type: String,
		default: '',
		trim: true,
		required: 'Name cannot be blank'
	},
	email: {
		type: String,
		default: '',
		trim: true,
		required: 'Email cannot be blank'
	},
	phone: {
		type: String,
		default: '',
		trim: true
	},
	subject: {
		type: String,
		default: '',
		trim: true
	},
	message: {
		type: String,
		default: '',
		trim: true,
		required: 'Message cannot be blank'
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Contact', ContactSchema);
