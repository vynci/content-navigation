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
		'ProgramCollection'	: require( 'collections/ProgramCollection' )
	};
	var components   = {};
	var layouts      = {};
	var models       = {};
	var views        = {
		'ErrorView' 		: require( 'views/ErrorView' ), 
		'ProgramCollection'	: require( 'views/Programs/ProgramsCollectionView')
	};

	var controllers = {};

	var that = this;

	var ProgramCollection;

	var ProgramsController = Marionette.Controller.extend({
		initialize : function ( options ) {

		}, 

		fetchCollection: function () {
			ProgramCollection.fetch();
		}, 

		show : function (region, collection) {
			ProgramCollection = collection ? collection : collections.ProgramCollection;
			ProgramCollection =  new ProgramCollection();
			console.log(new views.ProgramCollection())
			var programCollectionView = new views.ProgramCollection({ 
				collection: ProgramCollection
			});

			region.show(programCollectionView);

			console.log(ProgramCollection)

			this.fetchCollection();


		}

	});

	return ProgramsController;

});