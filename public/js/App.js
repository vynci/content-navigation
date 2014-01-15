define( function ( require ) {
	'use strict';

	// ## Import statements

	// Libs
	var Marionette   = require( 'marionette' );
	var Backbone     = require( 'backbone' );

	// App scripts
	var Router       = require( 'routers/AppRouter' );
	var Controller   = require( 'controllers/AppController' );

	// App event aggregator
	var Communicator = require( 'Communicator' );

	// App instantiation
	var App          = new Marionette.Application();

	// ## Initializers

	// The regions for the application
	App.addRegions( {
		'content'     : '#main-content',
	} );

	App.addInitializer( function ( options ) {

		// Controller init
		App.Controller = new Controller( {
			'App'     : App,
			'regions' : {
				'content'     : App.content
			},
			'Communicator' : Communicator
		} );

		// Router init
		App.Router = new Router( { 'controller' : App.Controller } );
	} );

	// start history
	App.on( 'initialize:after', function () {
		Backbone.history.start( { 'pushState' : false } );
	} );

	return App;
} );
