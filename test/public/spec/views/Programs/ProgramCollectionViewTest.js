define( function( require ) {
	'use strict';
	var $          = require( 'jquery' );
	var should     = require( 'chai' ).should();
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var async      = require( 'async' );

	var Collection = require( 'collections/ProgramCollection' );
	var Model 	   = require( 'models/ProgramModel' );
	var View 	   = require( 'views/Programs/ProgramsCollectionView' );

	var program = new Model( {
		'id': 101,
		'title': 'Assessment for Learning',
		'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
		'subPrograms': 2,
		'segments': 12,
		'programImg': 'http://builtbyhq.com/projects/respond/1/img/video-bg-3.png'
	} );

	var program2 = new Model( {
		'id': 102,
		'title': 'Assessment for Learning',
		'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
		'subPrograms': 2,
		'segments': 12,
		'programImg': 'http://builtbyhq.com/projects/respond/1/img/video-bg-3.png'
	} );
	
	var programsCollections = new Collection([program, program2]);

	var programsView = new View( { collection : programsCollections } );

	describe( 'Collections View', function () {
		programsView.collection.length.should.be.equal(2);
	} );
	
} );