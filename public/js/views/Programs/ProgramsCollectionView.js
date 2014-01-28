define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var programItemView = require('views/Programs/ProgramItemView');

	return Marionette.CollectionView.extend( {
		tagName: 'ul',
		className: 'cn-programs',
		itemView 	: programItemView
	} );
} );