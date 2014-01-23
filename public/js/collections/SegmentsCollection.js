define( function ( require ) {
	'use strict';
	var _           = require( 'underscore' );
	var Backbone    = require( 'backbone' );
	var Marionette  = require( 'marionette' );
	var model 		= require( 'models/Segment')

	var collection = Backbone.Collection.extend({
		model : model,
		url : 'testData/Segments_SubProgram_10101_Program_101.json'
	} );
	return collection;
} );