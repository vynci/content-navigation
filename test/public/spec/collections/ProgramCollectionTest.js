define( function ( require ) {
	'use strict';
	var $          = require( 'jquery' );
	var should     = require( 'chai' ).should();
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var async      = require( 'async' );
	var Collection = require( 'collections/ProgramCollection');
	var Model 	   = require( 'models/ProgramModel');
	var collection = new Collection();


	describe( 'testing collection test', function () {
		it( 'test this', function () {
			this.should.be.ok;
		} );
	} );

	describe( 'getting program collection', function () {
		it( 'program collection', function () {
			collection.should.be.ok;
		} );
		it( 'empty after fetch', function (){
			collection.should.have.length(1);
		} );
		it( 'have model values', function () {
			var model = new Model({
				id: 101,
				title: 'Assessment for Learning',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
				subPrograms: 2,
				segments: 12
			} );

			collection = new Collection( model );
			collection.length.should.eql(1);
		} );
	} );
} );