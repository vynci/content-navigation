define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var segmentItemView = require('views/Segments/SegmentItemView');

	return Marionette.CollectionView.extend( {
		tagName: 'ul',
		itemView: segmentItemView
	} );
} );