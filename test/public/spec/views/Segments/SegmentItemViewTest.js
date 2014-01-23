define( function ( require ) {
	'use strict';
	var $          = require( 'jquery' );
	var should     = require( 'chai' ).should();
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var async      = require( 'async' );
	var View 	   = require( 'views/Segments/SegmentItemView' );
	var Model 	   = require( 'models/Segment' );

	var SegmentItemView;
	var segment;

	describe( 'SegmentItemView test', function () {
		before( function () {
			segment = new Model( {
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
			} );
			SegmentItemView = new View( { model : segment } );
		} );
		it( 'should contain test values', function () {
			SegmentItemView.el.nodeName.should.be.equal( 'LI' );
		} );
  	} );
} );