// ## Manages f/e logic for the application
define( function ( require ) {
	'use strict';

	var _           = require( 'underscore' );
	var $           = require( 'jquery' );
	var Backbone    = require( 'backbone' );
	var Marionette  = require( 'marionette' );
	var App  		= require( 'App' );

	var collections  = {
		'SegmentCollection'	: require( 'collections/SegmentCollection' )
	};
	var components   = {};
	var layouts      = {};
	var models       = {};
	var views        = {
		'ErrorView' : require( 'views/ErrorView' )
	};

	var controllers = {};

	var that = this;

	var SegmentsController = Marionette.Controller.extend({
		initialize : function ( options ) {

		}, 

		show : function () {
			
		}

	});

	return SegmentsController;

});