define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var should     = require( 'chai' ).should();
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var async      = require( 'async' );

	var Controller   = require( 'controllers/AppController' );
	var Communicator = require( 'Communicator' );


	describe( 'AppController Test', function () {
		var controller;
		var contentRegion = new Marionette.Region( { 'el' : $( '#content' ) } );

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

		describe( '_setContent()', function () {
			before( createController );
			after( destroyController );

			describe( 'when passed a Marionette.View constructor', function () {

				describe( 'without an options hash', function () {
					var view;
					before( function () {
						view = controller._setContent( Marionette.View );
					} );

					it( 'should return an instantiated Marionette.View', function () {
						view.should.be.an.instanceof( Marionette.View );
					} );
					it( 'should be the new currentView of `controller.regions.content`', function () {
						controller.regions.content.currentView.should.equal( view );
					} );
				} );
				describe( 'with an options hash', function () {
					var view, options;
					before( function () {
						options = { 'fake' : 'fake' };
						view    = controller._setContent( Marionette.View, options );
					} );

					it( 'should return an instantiated Marionette.View', function () {
						view.should.be.an.instanceof( Marionette.View );
					} );
					it( 'should pass the hash to the view', function () {
						view.options.should.equal( options );
					} );
					it( 'should be the new currentView of `controller.regions.content`', function () {
						controller.regions.content.currentView.should.equal( view );
					} );
				} );
			} );
			describe( 'when passed a Marionette.View instance', function () {
				var view, options;
				before( function () {
					view = new Marionette.View();
					controller._setContent( view );
				} );

				it( 'should be the new currentView of `controller.regions.content`', function () {
					controller.regions.content.currentView.should.equal( view );
				} );
			} );
		} );

		describe( '_errorHandler()', function () {
			describe( '`SessionError`', function () {
				before( createController );
				after( destroyController );

				it( 'should navigate to login', function () {
					controller._errorHandler( {
						'name'    : 'SessionError',
						'message' : 'No session found.'
					} );
					navigateURL.should.equal( 'login' );
				} );
			} );
			describe( 'XHR/jqXHR error', function () {
				before( createController );
				after( destroyController );

				it( 'should use the statusText and show the errorView', function ( done ) {
					controller._errorHandler( {
						'readyState' : 1,
						'status'     : '404',
						'statusText' : 'Unavailable'
					} );
					setTimeout( function () {
						controller.regions.content.currentView.$el.html().should.equal( 'Unavailable' );
						done();
					}, 10 );
				} );
			} );
			describe( 'string', function () {
				before( createController );
				after( destroyController );

				it( 'should use the statusText and show the errorView', function ( done ) {
					controller._errorHandler( 'There was an error' );
					setTimeout( function () {
						controller.regions.content.currentView.$el.html().should.equal( 'There was an error' );
						done();
					}, 10 );
				} );
			} );
			describe( 'generic object', function () {
				before( createController );
				after( destroyController );

				it( 'should use the statusText and show the errorView', function ( done ) {
					controller._errorHandler( {
						'message' : 'There was an error'
					} );
					setTimeout( function () {
						controller.regions.content.currentView.$el.html().should.equal( 'There was an error' );
						done();
					}, 10 );
				} );
			} );
		} );

	} );

} );