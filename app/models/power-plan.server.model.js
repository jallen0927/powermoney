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
		default: ''
	},
	class: {
		type: String,
		enum: ['低用户', '标准用户']
	},
	fixed: {
		type: String,
		default: '0'
	},
	unit: {
		type: String,
		default: '0'
	},
	levy: {
		type: String,
		default: 'inclusive'
	},
	gst: {
		type: String,
		default: 'inclusive'
	},
	inst: {
		type: String,
		default: '0'
	},
	coupon: {
		type: String,
		default: '无'
	},
	special: {
		type: String,
		default: '无'
	}
});

mongoose.model('PowerPlan', PowerPlanSchema);
