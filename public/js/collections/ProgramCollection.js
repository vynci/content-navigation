define( function ( require ) {
	'use strict';
	var _           = require( 'underscore' );
	var Backbone    = require( 'backbone' );
	var Marionette  = require( 'marionette' );
	var model 		= require('models/ProgramModel')

	var collection = Backbone.Collection.extend({
		model : model		
	} );
	return collection;
} );