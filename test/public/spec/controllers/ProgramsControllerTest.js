define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var should     = require( 'chai' ).should();
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var async      = require( 'async' );

	var Controller   = require( 'controllers/ProgramsController' );
	var Communicator = require( 'Communicator' );

	describe( 'ProgramsController Test', function () {
		var controller;
		var contentRegion = new Marionette.Region( { 'el' : $( '#center-region' ) } );

		// router spy for this.App.Router.navigate() assertions
		var navigateURL = '';
		var router = {
			'navigate' : function ( url ) {
				navigateURL = url;
			}
		};

		var createController = function () {
			controller = new Controller( {
				'App'     : {
					'Router' : router
				},
				'regions' : {
					'content' : contentRegion
				},
				'Communicator' : Communicator
			} );
		};
		var destroyController = function () {
			contentRegion.reset();
			controller.stopListening();
			controller = undefined;
			Backbone.history.navigate( '' );
			navigateURL = '';
		};

		describe( 'show()', function () {
			before( createController );
			after( destroyController );

		} );
	} );

} );
