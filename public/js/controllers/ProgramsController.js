// ## Manages f/e logic for the application
define(function(require) {
    'use strict';

    var _ = require('underscore');
    var $ = require('jquery');
    var Backbone = require('backbone');
    var Marionette = require('marionette');
    var App = require('App');
    var async = require('async');

    var expander = require('expander');

    var collections = {
        'ProgramCollection': require('collections/ProgramCollection'),
        'SegmentCollection': require('collections/SegmentCollection')
    };
    var components = {};
    var layouts = {};
    var models = {};
    var views = {
        'ErrorView': require('views/ErrorView'),
        'ProgramCollection': require('views/Programs/ProgramsCollectionView')
    };

    var controllers = {};

    var that = this;

    var ProgramCollection;

    var ProgramsController = Marionette.Controller.extend({
        initialize: function(options) {

        },

        // Call the collectionview's collection fetch
        fetchCollection: function(callback) {
            ProgramCollection.fetch({
                success: function () {
                    callback(null)
                },
                error: function (error) {
                    callback(error);
                }
            });

            Window.ProgramCollection = ProgramCollection;

            Window.SegmentCollection = new collections.SegmentCollection();
        },

        showSegments: function(e) {
        	e.preventDefault();
            var model = this.model;
            var segmentExpander = this.ui.segmentExpander;
            var el = $(e.currentTarget);
            App.subControllers.Segments.showProgramSegments(model, segmentExpander);
        },

        // Show the program collection views
        // Params:
        // region - the region the render the collection view
        // collection - the collection to use for the collection view
        show: function(region, collection) {

            var that = this;

            ProgramCollection = collection ? collection : collections.ProgramCollection;
            ProgramCollection = new ProgramCollection();

            var programCollectionView = new views.ProgramCollection({
                itemViewOptions: {
                    events: {
                        'click div.cn-program-content': that.showSegments
                    }
                },
                collection: ProgramCollection
            });

            region.show(programCollectionView);
            //console.log(expander)
            // Fetch collection models
            async.series([
                this.fetchCollection,
                //expander.init
            ]);

        }

    });

    return ProgramsController;

});
