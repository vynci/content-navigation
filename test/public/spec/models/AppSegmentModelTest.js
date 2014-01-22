define( function( require ) {
	'use strict';
	var $          = require( 'jquery' );
	var should     = require( 'chai' ).should();
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var async      = require( 'async' );
	var Segment	   = require( 'models/Segment' );
	var View 	   = require( 'views/Segments/SegmentItemView');
	var model 	   = new Segment();
	//var view 	   = new View();

	describe( 'creating model', function () {
		it( 'getting model', function () {
			model.should.be.an.object;
		} );

		it( 'model properties', function () {
			model.attributes.should.include.keys( 'id', 'programId', 'subProgramId', 'title', 'description' );
		} );
		/*it( 'rendering model', function () {
			view.el.nodeName.should.be.equal('LI');
		} );*/
	} );
} );