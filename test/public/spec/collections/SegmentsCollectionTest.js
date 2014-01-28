define( function ( require ) {
	'use strict';
	var $          = require( 'jquery' );
	var should     = require( 'chai' ).should();
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var async      = require( 'async' );
	var Collection = require( 'collections/SegmentCollection');

	var segmentsCollection = new Collection();

	describe( 'Segments collection', function () {
		it( 'should be an instance', function () {
			segmentsCollection.should.be.an.instanceof( Collection );
		} );
  	} );
} );