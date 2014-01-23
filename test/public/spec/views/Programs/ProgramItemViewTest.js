define( function ( require ) {
	'use strict';
	var $          = require( 'jquery' );
	var should     = require( 'chai' ).should();
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var async      = require( 'async' );
	var View 	   = require( 'views/Programs/ProgramItemView' );
	var Model 	   = require( 'models/ProgramModel' );

	var programItemView;
	var program;

	describe( 'ProgramItemView test', function () {
		before( function () {
			program = new Model( {
				id 			: 101,
				title 		: 'test item view',
				description : 'testing program item view',
				subPrograms : 1,
				segments 	: 1,
				programImg 	: 'http://builtbyhq.com/projects/respond/1/img/video-bg-3.png'
			} );
			programItemView = new View( { model : program } );
		} );
		it( 'should contain test values', function () {
			programItemView.el.nodeName.should.be.equal( 'LI' );
		} );
  	} );
} );