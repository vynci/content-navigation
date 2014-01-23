define( function( require ) {
	'use strict';
	var $          = require( 'jquery' );
	var should     = require( 'chai' ).should();
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var async      = require( 'async' );

	var View 	   = require( 'views/Filters/FilterLayoutView' );
	
	var filtersView;

	describe( 'Filter Layout View', function () {	
		it( 'should be an instance', function () {
			filtersView = new View();
			filtersView.should.be.an.instanceof( View );
		} );
	} );
	
} );