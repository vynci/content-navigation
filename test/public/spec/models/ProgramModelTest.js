define( function( require ) {
	'use strict';
	var $          = require( 'jquery' );
	var should     = require( 'chai' ).should();
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var async      = require( 'async' );
	var Program	   = require( 'models/ProgramModel' );
	var ProgramView = require( 'views/Programs/ProgramItemView');

	var programModel = new Program();
	var programView  = new ProgramView();

	describe( 'Program model test', function () {
		it( 'getting program model file', function () {
			programModel.should.be.ok;
		} );
		it( 'program model', function () {
			programModel.attributes.should.include.keys( 'id', 'title', 'description', 'subPrograms', 'segments' );
		} );
		it( 'model have default values', function () {
			programModel.attributes.title.should.eql( 'Program title' );
			programModel.attributes.description.should.eql( 'Program description' );
		} );
	} );
	describe( 'can render data', function () {

		var newProgramModel = new Program({
			id: 101,
			title: 'Assessment for Learning',
			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
			subPrograms: 2,
			segments: 12
		} );

		it( 'data', function () {			
			newProgramModel.attributes.title.should.eql( 'Assessment for Learning' );
			newProgramModel.attributes.description.should.contain( 'Lorem' );
		} );
		it( 'model view', function () {
			programView = new ProgramView( newProgramModel );
			programView.attributes.should.include.keys( 'id', 'title', 'description', 'subPrograms', 'segments', 'programImg' );
		} );
	} );
} );