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
	desc: {
		type: String,
		default: '',
		trim: true
	},
	//category: {
	//	type: Schema.ObjectId,
	//	ref: 'Category',
	//	default: null
	//},
	image: {
		type: String,
		default: null,
		trim: true
	}
});

mongoose.model('Product', ProductSchema);
