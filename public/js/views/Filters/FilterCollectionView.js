define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var template   = require( 'text!templates/Filters/FilterCollectionView.html' );

	var filterItemView = require('views/Filters/FilterItemView');

	return Marionette.CollectionView.extend( {
		itemView 	: filterItemView
	} );
} );