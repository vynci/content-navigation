define( function( require ) {
	'use strict';
	var $          = require( 'jquery' );
	var should     = require( 'chai' ).should();
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var async      = require( 'async' );
	var Model	   = require( 'models/Segment' );
	var segmentModel = new Model();

	describe( 'Segment Model Test', function () {
		it( 'should be an instance', function () {
			segmentModel.should.be.an.instanceof( Model );
		} );
		it ( 'should contain keys', function () {
			segmentModel.attributes.should.include.keys( 'ContentId', 'ContentParentId', 'ContentName', 'ContentDescription', 'ContentTypeId', 'PresentationOrder', 'SegmentLengthInSeconds', 'SKU', 'FileName', 'ImageURL', 'GuidebookFileName', 'AudioFileName', 'TranscriptFileName', 'PreviewVideoName', 'Created', 'Creator', 'Modified', 'Modifier', 'Removed', 'Remover', 'SearchData', 'EditionName', 'ProgramName', 'Children' );
		} );
		it( 'shoulde have default values', function () {
			segmentModel.attributes.ContentName.should.be.equal( 'Content Name' );
			segmentModel.attributes.ContentDescription.should.be.equal( 'Content Description' );
			segmentModel.attributes.ImageURL.should.be.equal( 'http://builtbyhq.com/projects/respond/2/img/video-bg-2.png' );
		} );
	} );
} );