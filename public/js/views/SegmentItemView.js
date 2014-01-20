define( function( require ) {
	'use strict';
	var _           = require( 'underscore' );
	var Backbone    = require( 'backbone' );
	var Marionette  = require( 'marionette' );
	var model 		= require('models/Segment')

	var SegmentItemView = Backbone.View.extend( {
		model : model,
		tagName : 'li',
		className : 'segment'
	} );

	return SegmentItemView;
} );