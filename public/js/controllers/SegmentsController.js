// ## Manages f/e logic for the application
define( function ( require ) {
	'use strict';

	var _           = require( 'underscore' );
	var $           = require( 'jquery' );
	var Backbone    = require( 'backbone' );
	var Marionette  = require( 'marionette' );
	var App  = require( 'App' );

	var applications = {};
	var collections  = {
		'SegmentsCollection'	: require('collections/SegmentsCollection')
	};
	var components   = {};
	var layouts      = {};
	var models       = {};
	var views        = {
		'ErrorView' : require( 'views/ErrorView' ),
		'SegmentsCollection'	: require('views/Segments/SegmentsCollectionView')
	};

	var controllers = {};

	var that = this;

	var SegmentsCollection;

	console.log('SegmentsController')
	console.log(App)

	var SegmentsController = Marionette.Controller.extend({
		initialize : function ( options ) {

		},

		fetchCollection : function(){
			SegmentsCollection.fetch();
		},

		show : function (region, collection) {
			console.log(region)
			SegmentsCollection = collection ? collection : collections.SegmentsCollection;
			SegmentsCollection =  new SegmentsCollection();
			console.log(new views.SegmentsCollection())
			var segmentsCollectionView = new views.SegmentsCollection({
				collection: SegmentsCollection
			});

			region.show(segmentsCollectionView);

			console.log(SegmentsCollection)

			this.fetchCollection();
		}

	});

	return SegmentsController;

});