define( function ( require ) {
	'use strict';
	var $          = require( 'jquery' );
	var should     = require( 'chai' ).should();
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var async      = require( 'async' );
	var Collection = require( 'collections/ProgramCollection');
	var Model 	   = require( 'models/ProgramModel');

	var programsCollections = new Collection();

	describe( 'getting program collection', function () {
	
		it( 'fetching collection', function (done) {
			programsCollections.fetch ( {
				success : function (col, res, opt) {
					col.at(0).attributes.should.include.keys( 'id', 'description', 'title', 'subPrograms', 'segments', 'programImg' );
					col.length.should.be.above(0);
					done();
				}
			} )
		} );
		
  	} );
} );