define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var template   = require( 'text!templates/Programs/ProgramItemView.html' );

	return Marionette.ItemView.extend( {
		tagName: 'li',
		className: 'cn-program',
		'template'  : _.template( template )
	} );
} );