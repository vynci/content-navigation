define( function ( require ) {
	'use strict';
	var _           	= require( 'underscore' );
	var Backbone    	= require( 'backbone' );
	var Marionette  	= require( 'marionette' );
	var SegmentModel 	= require( 'models/SegmentModel')

	var SegmentCollection = Backbone.Collection.extend({
		url		: 'testData/Segments_SubProgram_10101_Program_101.json',
		model 	: SegmentModel
	} );
	return SegmentCollection;
} );