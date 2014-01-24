// ## Manages f/e logic for the application
define( function ( require ) {
	'use strict';

	var _           = require( 'underscore' );
	var $           = require( 'jquery' );
	var Backbone    = require( 'backbone' );
	var Marionette  = require( 'marionette' );
	var App 		= require( 'App' );

	var collections  = {};
	var components   = {};
	var layouts      = {};
	var models       = {};
	var views        = {
		'ErrorView' : require( 'views/ErrorView' ),
		'HeaderLayout' : require( 'views/HeaderLayout' )
	};

	var controllers = {};

	var that = this;

	var HeaderController = Marionette.Controller.extend({
		initialize : function ( options ) {

		}, 

		show : function (region) {
			region.show(new views.HeaderLayout());
			return region;
		}

	});

	return HeaderController;

});