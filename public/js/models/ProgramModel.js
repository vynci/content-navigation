define( function ( require ) {
	'use strict';
	var _ 					= require( 'underscore' );
	var Backbone    		= require( 'backbone' );
	var BackboneRelational 	= require( 'backbone-relational' );
	var Marionette  		= require( 'marionette' );

	var SegmentModel 		= require( 'models/SegmentModel');
	var SegmentCollection	= require( 'collections/SegmentCollection');

	var ProgramModel = Backbone.RelationalModel.extend({
		idAtrribute		: 'id',
		relations : [{
			type 			: Backbone.HasMany,
			key				: 'VideoSegments',
			keySource		: 'ContentId',
			keyDestination 	: 'ContentId',
			relatedModel	: SegmentModel,
			collectionType	: SegmentCollection,
			collectionKey 	: 'ContentId',
			autoFetch		: true,
			// autoFetch: {
			// 	success: function( model, response ) {
			// 		console.log('success')
			// 		console.log('success')
			// 		console.log('success')
			// 		console.log('success')
			// 		console.log('success')
			// 		console.log('success')
			// 	},
			// 	error: function( model, response ) {
			// 		console.log('error')
			// 		console.log('error')
			// 		console.log('error')
			// 		console.log('error')
			// 		console.log('error')
			// 		console.log('error')
			// 	}
			// },
			reverseRelation: {
				key: 'ContentParentId'
			}
		}]
	} );

	return ProgramModel;
} );