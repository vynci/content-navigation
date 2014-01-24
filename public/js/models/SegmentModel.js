define( function ( require ) {
	'use strict';
	var _           = require( 'underscore' );
	var Backbone    = require( 'backbone' );
	var BackboneRelational 	= require( 'backbone-relational' );
	var Marionette  = require( 'marionette' );

	var SegmentModel = Backbone.RelationalModel.extend({		
		urlRoot		: 'testData/Segments_SubProgram_10101_Program_101.json',
		idAtrribute : 'ContentId'
	} );

	return SegmentModel;
} );