define( function ( require ) {
	'use strict';
	var $          = require( 'jquery' );
	var should     = require( 'chai' ).should();
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var async      = require( 'async' );
	var Collection = require( 'collections/ProgramCollection');

	var programsCollection = new Collection();

	describe( 'program collection', function () {
		it( 'should be an instance', function () {
			programsCollection.should.be.an.instanceof(Collection);
		} );
  	} );
} );