define( function( require ) {
	'use strict';
	var $          = require( 'jquery' );
	var should     = require( 'chai' ).should();
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var async      = require( 'async' );

	var View 	   = require( 'views/Segments/SegmentsCollectionView' );
	var Model	   = require( 'models/SegmentModel' );
	var Collection = require( 'collections/SegmentCollection' );
	

	describe( 'Segment Collection View', function () {
		var segmentView;
		var	segmentsCollection;
		var segments;

		before( function () {
			segments = [
				new Model( {
					ContentId 			: 10101,
					ContentParentId 	: 1011,
					ContentName			: 'Content Name',
					ContentDescription	: 'Content Description',
					ContentTypeId		: 0,
					PresentationOrder	: 0,
					SegmentLengthInSeconds : 0,
					SKU					: '',
					FileName 			: '',
					ImageURL			: 'http://builtbyhq.com/projects/respond/2/img/video-bg-2.png',
					GuidebookFileName	: '',
					AudioFileName		: '',
					TranscriptFileName	: '',
					PreviewVideoName	: '',
					Created				: 0,
					Creator				: 0,
					Modified			: 0,
					Modifier			: 0,
					Removed				: 0,
					Remover				: 0,
					SearchData			: '',
					EditionName			: '',
					ProgramName			: '',
					Children			: []
				} ),
				new Model( {
					ContentId 			: 10101,
					ContentParentId 	: 1011,
					ContentName			: 'Content Name 2',
					ContentDescription	: 'Content Description 2',
					ContentTypeId		: 0,
					PresentationOrder	: 0,
					SegmentLengthInSeconds : 0,
					SKU					: '',
					FileName 			: '',
					ImageURL			: 'http://builtbyhq.com/projects/respond/2/img/video-bg-2.png',
					GuidebookFileName	: '',
					AudioFileName		: '',
					TranscriptFileName	: '',
					PreviewVideoName	: '',
					Created				: 0,
					Creator				: 0,
					Modified			: 0,
					Modifier			: 0,
					Removed				: 0,
					Remover				: 0,
					SearchData			: '',
					EditionName			: '',
					ProgramName			: '',
					Children			: []
				} )
			];

			segmentsCollection = new Collection( segments );
		} );

		after( function () {
			segmentsCollection = null;
		} )
		it( 'should contain segments collection', function () {
			segmentView = new View( { collection : segmentsCollection } );
			segmentView.collection.at(0).attributes.should.include.keys( 'ContentName', 'ContentId', 'ContentDescription' );
			segmentView.collection.at(0).attributes.ContentDescription.should.contain( 'Description' );
		} );
	} );	
} );