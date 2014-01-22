define( function( require ) {
	'use strict';
	var $          = require( 'jquery' );
	var should     = require( 'chai' ).should();
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var async      = require( 'async' );
	var Model	   = require( 'models/Segment' );
	var segmentModel = new Model();

	describe( 'Model Test', function () {
		it( 'should be an instance', function () {
			segmentModel.should.be.an.instanceof( Model );
		} );

		it( ' default model properties', function () {
			segmentModel.attributes.should.include.keys( 'id', 'programId', 'subProgramId', 'title', 'description' );
		} );
	} );
} );