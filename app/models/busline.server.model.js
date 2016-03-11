'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var BuslineSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	labels: [{
		type: String,
		default: []
	}],
	name: {
		type: String,
		default: '',
		trim: true
	},
	stops: [{

		name: {
			type: String,
			default: '',
			trim: true
		},
		arrivals: [{
			type: String,
			trim: true
		}],
		departures: [{
			type: String,
			trim: true
		}],
		lat: {
			type: Number,
			required: 'Bus stop needs a latitude'
		},
		lng: {
			type: Number,
			required: 'Bus stop needs a longitude'
		}


	}]
});

mongoose.model('Busline', BuslineSchema);
