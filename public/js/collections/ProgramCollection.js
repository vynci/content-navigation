define( function ( require ) {
        'use strict';
        var _           	= require( 'underscore' );
        var Backbone    	= require( 'backbone' );
        var Marionette  	= require( 'marionette' );
        var ProgramModel	= require( 'models/ProgramModel')

        var ProgramCollection = Backbone.Collection.extend({
                model: ProgramModel,
                url : 'testData/ProgramsAll.json'
        } );
        return ProgramCollection;
} );