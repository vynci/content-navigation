define( function( require ) {
	'use strict';
	var $          = require( 'jquery' );
	var should     = require( 'chai' ).should();
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var async      = require( 'async' );

	var View 	   = require( 'views/Programs/ProgramsCollectionView' );
	
	var programsView;

	describe( 'Collections View', function () {	
		it( 'should be an instance', function () {
			programsView = new View();
			programsView.should.be.an.instanceof( View );
		} );
	} );
	
} );