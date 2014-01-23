define( function( require ) {
	'use strict';
	var $          = require( 'jquery' );
	var should     = require( 'chai' ).should();
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var async      = require( 'async' );

	var View 	   = require( 'views/Programs/ProgramsCollectionView' );
	var Collection = require ('collections/ProgramCollection' );
	var Model	   = require( 'models/ProgramModel' );
	
	var programsView;
	var programs;
	var programsCollection;

	describe( 'Collections View', function () {

		before( function () {
			programs = [
				new Model( {
					id 			: 101,
					title 		: 'test title',
					description : 'test Program description',
					subPrograms : 2,
					segments 	: 1,
					programImg 	: 'http://builtbyhq.com/projects/respond/1/img/video-bg-3.png'
				} ),
				new Model( {
					id 			: 102,
					title 		: 'test title 2',
					description : 'test description 2',
					subPrograms : 3,
					segments 	: 2,
					programImg 	: 'http://builtbyhq.com/projects/respond/1/img/video-bg-3.png'
				} )
			];

			programsCollection = new Collection( programs )

		} );

		after ( function () {
			programsCollection = null;
		} )

		it( 'should contain collection', function () {
			programsView = new View( { collection : programsCollection } );
			programsView.should.include.keys( 'collection' );
			programsView.collection.at(0).attributes.should.include.keys( 'id', 'title', 'description', 'subPrograms', 'segments', 'programImg' );
			programsView.collection.at(0).attributes.description.should.contain('description');
		} );
	} );
	
} );