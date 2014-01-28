define( function( require ) {
	'use strict';
	var $          = require( 'jquery' );
	var should     = require( 'chai' ).should();
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var async      = require( 'async' );

	var Controller = require( 'controllers/SegmentsController' );

	var controller = new Controller();

	describe( 'Segment Controller', function () {
		it( 'should be an instance', function () {
			controller.should.be.an.instanceof( Controller );
		} );
		it( 'should call getClickedProgram', function () {
			var spy = sinon.spy( controller, 'getClickedProgram' );
			spy.should.have.been.calledOnce;
		} );
		it( 'should call setClickedProgram', function () {
			var spy = sinon.spy( controller, 'setClickedProgram' );
			spy.should.have.been.calledOnce;
		} );
		it( 'should call fetchProgramSegments', function () {
			var spy = sinon.spy( controller, 'fetchProgramSegments' );
			spy.should.have.been.calledOnce;
		} );
		it( 'should call showProgramSegments', function () {
			var spy = sinon.spy( controller, 'showProgramSegments' );
			spy.should.have.been.calledOnce;
		} );

	} );
} );