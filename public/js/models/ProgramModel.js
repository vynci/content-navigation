define( function ( require ) {
	'use strict';
	var _           = require( 'underscore' );
	var Backbone    = require( 'backbone' );
	var Marionette  = require( 'marionette' );

	var ProgramModel = Backbone.Model.extend({
		defaults : {
			id : 101,
			title : 'Program title',
			description : 'Program description',
			subPrograms : 1,
			segments : 	1
		}
	} );

	return ProgramModel;
} );