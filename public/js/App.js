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
		'topRegion'		: '#top-region',
		'leftRegion'	: '#left-region',
		'centerRegion'	: '#center-region',
		'bottomRegion'	: '#bottom-region'
	} );

	App.addInitializer( function ( options ) {

		// Controller init
		App.Controller = new Controller( {
			// 'token'   : options.access_token,
			'App'     : App,
			'regions' : {
				'topRegion'		: App.topRegion,
				'leftRegion'	: App.leftRegion,
				'centerRegion'	: App.centerRegion,
				'bottomRegion'	: App.bottomRegion
			},
			'Communicator' : Communicator
		} );

		// Router init
		App.Router = new Router( { 'controller' : App.Controller } );
		console.log(App);
	} );

	// start history
	App.on( 'initialize:after', function () {
		Backbone.history.start( { 'pushState' : false } );
	} );

	return App;
} );
