// ## Manages f/e logic for the application
define( function ( require ) {
	'use strict';

	var _           = require( 'underscore' );
	var $           = require( 'jquery' );
	var Backbone    = require( 'backbone' );
	var Marionette  = require( 'marionette' );
	var async  		= require( 'async' );

	var applications = {};
	var collections  = {};
	var components   = {};
	var layouts      = {};
	var models       = {};
	var views        = {
		'ErrorView' : require( 'views/ErrorView' ),
		'GridContent'	: null
	};

	var subControllers = {};

	var App;

	var that = this;

	console.log(this);

	var API = {

		showHeader: function (callback) {
			require(['controllers/HeaderController'], function(HeaderController) {
				_.bindAll(that);

				subControllers.Header = new HeaderController();

			   	subControllers.Header.show(App.topRegion);

			   	callback(null);
			});
		},

		showFilters: function (callback) {
			require(['controllers/FiltersController'], function(FiltersController) {
				_.bindAll(that);

				subControllers.Filters = new FiltersController();

			   	subControllers.Filters.show(App.leftRegion);

			   	callback(null);
			});
		},

		showGrid: function (callback) {
			require(['controllers/GridController'], function(GridController) {
				_.bindAll(that);

				subControllers.Grid = new GridController();

			   	views.GridContent = subControllers.Grid.show(App.centerRegion);

			   	callback(null);
			});
		},

		showContents: function () {
			require(['controllers/ProgramsController', 'controllers/SegmentsController'], function(ProgramsController, SegmentsController) {
				_.bindAll(that);

				subControllers.Programs = new ProgramsController();
				subControllers.Segments = new SegmentsController();
				console.log(views.GridContent)
			   	subControllers.Programs.show( views.GridContent.mainRegion );
			    //subControllers.Segments.show( views.GridContent.mainRegion );
			});
		}
	};

	return Marionette.Controller.extend( {

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );
			console.log('init')
			console.log(this)
			return this;
		},

		'showDefault' : function ( actions ) {
			console.log('default')
			console.log(API)
			console.log(async)

			App = this.App;

			console.log(this.App)

			if (!App.subControllers) {
				async.series([
					API.showHeader,
					API.showFilters,
					API.showGrid
				], API.showContents);

				App.subControllers = subControllers;

			} else {
				API.showContents( actions );
			}



		},

		// Views builder
		'showContents': function ( filter, sort, content ) {
			console.log('contents')
			// Views builder
		},

		// ## Region management methods

		'_setContent' : function ( View, options ) {
			var view;
			if ( typeof View === 'function' ) {
				options = options || {};
				view = new View( options );
			} else {
				view = View;
			}
			this.regions.content.show( view );

			return view;
		},

		// ## Middleware functions ( checkSession )

		// general error handler to display an errorview in the `content` region
		'_errorHandler' : function ( error ) {
			// Show login page ?  or show limited functionality ?
			if ( _.isObject( error ) ) {
				if ( error.name === 'SessionError' ) {
					if ( Backbone.history.fragment !== 'login' ) {
						this.requestedRoute = Backbone.history.fragment;
					}
					return this.App.Router.navigate( 'login', { 'trigger' : true } );
				}
				// if there's no message, but there is a xhr statusText
				else if ( !error.message && error.statusText ) {
					error.message = error.statusText;
				}
			}
			// if just a string
			else {
				error = { 'message' : error };
			}
			this._setContent( views.ErrorView, { 'model' : new Backbone.Model( error ) } );
		},

		// global $.ajax error handler
		'_ajaxErrorHandler' : function ( e, xhr, settings, exception ) {
			var subURI = e.delegateTarget.documentURI.split( '#' );
			var error;
			var responseTextObj;

			if ( subURI[ 1 ] === 'login' ) {
				if ( xhr.responseText !== 'Unauthorized' ) {

					responseTextObj = JSON.parse( xhr.responseText );

					// setting 'target' : 'loginForm' will attempt to display the error on the form
					error = {
						'msg'        : responseTextObj.message,
						'type'       : 'error',
						'status'     : xhr.status,
						'statusText' : xhr.statusText,
						'target'     : 'login'

					};
				} else {
					error = {
						'msg'        : xhr.responseText,
						'type'       : 'error',
						'status'     : xhr.status,
						'statusText' : xhr.statusText
					};
				}
			} else {
				responseTextObj = JSON.parse( xhr.responseText );

				error = {
					'msg'        : responseTextObj.message,
					'type'       : 'error',
					'status'     : xhr.status,
					'statusText' : xhr.statusText
				};
			}

			this._errorHandler( error );
		}

	} );

} );