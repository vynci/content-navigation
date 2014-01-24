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
		'ErrorView' 	: require( 'views/ErrorView' ),
		'GridLayout' 	: require( 'views/Grid/GridLayoutView' )
	};

	var controllers = {};

	var that = this;

	var GridController = Marionette.Controller.extend({
		initialize : function ( options ) {

		}, 
		show : function (region) {
			var gridLayout = new views.GridLayout();
			region.show(gridLayout);
			return gridLayout;
		}

	});

	return GridController;

});