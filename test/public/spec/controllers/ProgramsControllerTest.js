define(function(require) {
    'use strict';
 
    var $ = require( 'jquery' );
    var should = require( 'chai' ).should();
    var Backbone = require( 'backbone' );
    var Marionette = require( 'marionette' );
    var async = require( 'async' );

    var Controller = require( 'controllers/ProgramsController' );
    var Collection = require( 'collections/ProgramCollection' );

    describe('Programs Controller', function() {
        var controller = new Controller();
        var collection = new Collection();
        it('should be an instance', function() {
            controller.should.be.an.instanceof(Controller);
        });
        it('should have functions', function() {
            controller.show.should.be.a.function;
            controller.initialize.should.be.a.function;
            controller.fetchCollection.should.be.a.function;
            controller.showSegments.should.be.a.function;
        });
        it('show region', function() {
            var region = new Marionette.Region({
                el: $('#center-region')
            });
            var showRegion = controller.show( region, Collection );
            showRegion.should.be.an.instance;
        });
        it('should fetch json data', function( done ) {
            collection.fetch({
                success: function( col, res, opt ) {
                    col.length.should.be.above(0);
                    done();
                }
            });
        });
    });
});