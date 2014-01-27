define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var should     = require( 'chai' ).should();
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var async      = require( 'async' );
	var _ 		   = require( 'underscore');

	var Controller   = require( 'controllers/ProgramsController' );
	var Collection = require( 'collections/ProgramCollection' );
	var template   = require( 'text!templates/Grid/GridLayoutView.html' );

	describe( 'Programs Controller', function () {	
		var controller = new Controller();
		var collection = new Collection();

		it( 'should be an instance', function () {
			controller.should.be.an.instanceof( Controller );
		} );
		it( 'should have functions', function () {
			controller.show.should.be.a.function;
			controller.initialize.should.be.a.function;
			controller.fetchCollection.should.be.a.function;
		} );
		it( 'show region', function ( done ) {
			var region = new Marionette.Layout.extend( {
				'template'  : _.template( template ), 
				regions:{ mainRegion : '#grid-content' }	
			} );

			var showRegion = controller.show( region , Collection );
			showRegion.should.be.an.instance;

			collection.fetch( { 
				success: function( col, res, opt ) {
					col.length.should.be.above(0);
					done();
				}
			} );
		} );
	} );

} );
 