define( function ( require ) {
	'use strict';
	var _           = require( 'underscore' );
	var Backbone    = require( 'backbone' );
	var Marionette  = require( 'marionette' );

	var SegmentModel = Backbone.Model.extend({
		defaults : {
			id : 101,
			programId : 101,
			subProgramId : 1011,
			title : 'Segment Title',
			description : 'Segment description'
		}
	} );

	return SegmentModel;
} );