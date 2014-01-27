define(function(require) {
    'use strict';
    var _ 				= require('underscore');
    var Backbone 		= require('backbone');
    var Bass 			= require('backbone-associations');

    var SegmentCollection = require( 'collections/SegmentCollection');
    var SegmentModel	= require( 'models/SegmentModel');

    var ProgramModel 	= Backbone.AssociatedModel.extend({
        defaults: {
            ContentId: 101,
            title: 'Program title',
            description: 'Program description',
            subPrograms: 1,
            segments: 1,
            programImg: 'http://builtbyhq.com/projects/respond/1/img/video-bg-3.png',
            Children: []
        },
        idAttribute: 'ContentId', 

        relations	: [{
        	type 			: Backbone.Many,
        	key 			: 'Children',
        	relatedModel	: SegmentModel,
        	collectionType	: SegmentCollection
        }], 

        initialize: function () {
        	var that = this;
            this.get('Children').url = function(){
                return 'testData/Segments_SubProgram_10101_Program_101.json?' + that.id ;
            }
        }
    });    

    return ProgramModel;
});
