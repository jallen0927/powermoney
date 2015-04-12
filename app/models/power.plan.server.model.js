/**
 * Created by xlin on 5/04/15.
 */
'use strict';
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PowerPlanSchema = new Schema({
	//company: {
	//	type: Schema.ObjectId,
	//	ref: 'PowerCompany'
	//},
	company: {
		type: String,
		default: '',
		trim: true
	},
	class: {
		type: String,
		default: '',
		//enum: ['低用户', '标准用户'],
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
	levy: {
		type: String,
		default: 'inclusive',
		trim: true
	},
	gst: {
		type: String,
		default: 'inclusive',
		trim: true
	},
	discount: {
		type: String,
		default: '0',
		trim: true
	},
	coupon: {
		type: String,
		default: '无',
		trim: true
	},
	special: {
		type: String,
		default: '无',
		trim: true
	}
});

mongoose.model('PowerPlan', PowerPlanSchema);
