/**
 * Created by xlin on 5/04/15.
 */
'use strict';
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PowerPlanSchema = new Schema({
	class: {
		type: String,
		enum: ['低用户', '标准用户']
	},
	fixed: {

	},
	unit: {

	},
	levy: {

	},
	gst: {

	},
	inst: {

	},
	coupon: {

	},
	company: {
		type: Schema.ObjectId,
		ref: 'PowerCompany'
	}
});

mongoose.model('PowerPlan', PowerPlanSchema);
