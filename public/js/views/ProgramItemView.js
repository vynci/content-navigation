define( function( require ) {
	'use strict';
	var _           = require( 'underscore' );
	var Backbone    = require( 'backbone' );
	var Marionette  = require( 'marionette' );

	var ProgramItemView = Backbone.View.extend( {
		tagName : 'li',
		className : 'program'
	} );

	return ProgramItemView;
} );