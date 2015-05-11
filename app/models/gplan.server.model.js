/**
 * Created by xlin on 5/04/15.
 */
'use strict';
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var GplanSchema = new Schema({
	//company: {
	//	type: Schema.ObjectId,
	//	ref: 'Company'
	//},
	company: {
		type: String,
		default: '',
		trim: true
	},
	name: {
		type: String,
		default: '',
		trim: true
	},
	area: {
		type: String,
		default: '',
		trim: true
	},
	fixed: {
		type: String,
		default: '0',
		trim: true
	},
	rate: {
		type: String,
		default: '0',
		trim: true
	},
	ratewgas: {
		type: String,
		default: '0',
		trim: true
	},
	gst: {
		type: String,
		default: '0',
		trim: true
	},
	ppd: {
		type: String,
		default: '0',
		trim: true
	},
	special: {
		type: String,
		default: '无',
		trim: true
	}
});

mongoose.model('Gplan', GplanSchema);
