/**
 * Created by xlin on 5/04/15.
 */
'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ProductSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Title cannot be blank',
		trim: true
	},
	spec: {
		type: String,
		default: '',
		trim: true
	},
	category: {
		type: Schema.ObjectId,
		ref: 'HardwareCategory'
	},
	image: {
		type: Schema.ObjectId,
		ref: 'Image'
	}
});

mongoose.model('Product', ProductSchema);
