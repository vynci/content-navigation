// ## Manages f/e logic for the application
define( function ( require ) {
	'use strict';

	var _           = require( 'underscore' );
	var $           = require( 'jquery' );
	var Backbone    = require( 'backbone' );
	var Marionette  = require( 'marionette' );
	var App  = require( 'App' );

	var applications = {};
	var collections  = {};
	var components   = {};
	var layouts      = {};
	var models       = {};
	var views        = {
		'ErrorView' : require( 'views/ErrorView' )
	};

	var controllers = {};

	var that = this;

	console.log('SegmentsController')
	console.log(App)

	var SegmentsController = Marionette.Controller.extend({
		initialize : function ( options ) {

		}, 

		show : function () {
			
		}

	});

	return SegmentsController;

});