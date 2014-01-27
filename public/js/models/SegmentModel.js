define(function(require) {
    'use strict';
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Marionette = require('marionette');
    var Bass 			= require('backbone-associations');

    var SegmentModel = Backbone.AssociatedModel.extend({
        defaults: {
            ContentId: -1,
            ContentParentId: 1011,
            ContentName: 'Content Name',
            ContentDescription: 'Content Description',
            ContentTypeId: 0,
            PresentationOrder: 0,
            SegmentLengthInSeconds: 0,
            SKU: '',
            FileName: '',
            ImageURL: 'http://builtbyhq.com/projects/respond/2/img/video-bg-2.png',
            GuidebookFileName: '',
            AudioFileName: '',
            TranscriptFileName: '',
            PreviewVideoName: '',
            Created: 0,
            Creator: 0,
            Modified: 0,
            Modifier: 0,
            Removed: 0,
            Remover: 0,
            SearchData: '',
            EditionName: '',
            ProgramName: '',
            Children: []
        },
        idAttribute: 'ContentId'
    });

    return SegmentModel;
});
