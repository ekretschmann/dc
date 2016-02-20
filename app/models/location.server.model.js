'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Location Schema
 */
var LocationSchema = new Schema({
	type: {
		type: String,
		default: 'unknown',
		required: 'Please fill Location type',
		trim: true
	},
	name: {
		type: String,
		default: 'unknown',
		trim: true
	},
	labels: [{
		type: String,
		default: []
	}],
	lat: {
		type: Number,
		default: 0
	},
	lng: {
		type: Number,
		default: 0
	},
	created: {
		type: Date,
		default: Date.now
	},
	info: {
		type: Schema.Types.Mixed
	}
});

mongoose.model('Location', LocationSchema);
