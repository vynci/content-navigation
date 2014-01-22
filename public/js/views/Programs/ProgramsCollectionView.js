define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var template   = require( 'text!templates/Grid/GridLayoutView.html' );

	var programItemView = require('views/Programs/ProgramItemView');

	return Marionette.CollectionView.extend( {
		itemView 	: programItemView
	} );
} );