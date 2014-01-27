// ## Manages f/e logic for the application
define( function ( require ) {
	'use strict';

	var _           = require( 'underscore' );
	var $           = require( 'jquery' );
	var Backbone    = require( 'backbone' );
	var Marionette  = require( 'marionette' );
	var App  		= require( 'App' );

	var async  		= require( 'async' );

	var collections  = {
		'SegmentCollection'	: require( 'collections/SegmentCollection' )
	};
	var components   = {};
	var layouts      = {};
	var models       = {};
	var views        = {
		'ErrorView' : require( 'views/ErrorView' ),
		'SegmentsCollectionView': require('views/Segments/SegmentsCollectionView')
	};

	var controllers = {};

	var that = this;

	var store = {};

	var SegmentsController = Marionette.Controller.extend({
		initialize : function ( options ) {

		}, 

		getClickedProgram: function () {
			return store.program ? store.program : null;
		},

		setClickedProgram: function (model, el, segmentsCollectionView) {
			store.program = {
				model: model,
				el: el,
				segmentsCollectionView: segmentsCollectionView
			}
		},

		fetchProgramSegments: function ( programModel, callback ) {
			var collection = programModel.get('Children');
			
			if (collection.length && collection.first().get('ContentId') !== -1) {
				callback(collection)
			} else {				
				collection.fetch({
					success: function () {
						callback(collection);
					}, 
					error: function (err) {
						callback(err);
					}
				});
			}	
		},

		showProgramSegments: function (programModel, el ) {
			var that = this;

			var clickedProgram = this.getClickedProgram();
			
			if (!clickedProgram || clickedProgram.model.get('ContentId') !== programModel.get('ContentId')) {

				this.cleanPreviousProgram();
				
				async.series([
					function (callback) {

						that.fetchProgramSegments(programModel, callback);

					}, 
				], function () {

					that.renderProgramSegments(programModel, el)

				});

			} else {

				this.showHideProgramSegments();

			}			
		},

		cleanPreviousProgram: function () {
			if (this.getClickedProgram()) {
				this.getClickedProgram().segmentsCollectionView.close();
			}
		},

		renderProgramSegments: function (programModel, el) {

			var collection = programModel.get('Children');
			
			var segmentsCollectionView = new views.SegmentsCollectionView({
				collection: collection
			});			

			segmentsCollectionView.render();

			$(el).hide();
			
			$(el).html(segmentsCollectionView.el);

			this.setClickedProgram(programModel, el, segmentsCollectionView);

			this.showHideProgramSegments();

			return segmentsCollectionView;
			
		},

		showHideProgramSegments: function () {
			var el = this.getClickedProgram().el;
			$(el).toggle('slow');
		}, 

		show : function () {
			
		}

	});

	return SegmentsController;

});