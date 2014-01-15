'use strict';

var async  = require( 'async' );
var fs     = require( 'fs' );
var path   = require( 'path' );
var exec   = require( 'child_process' ).exec;

var paths    = require( 'paths' );
var testData = paths( 'testData' );

module.exports = function ( grunt ) {

	// files:copy
	grunt.registerTask( 'files:copy', 'copys test files to their destination', function () {
		var done    = this.async();
		var project = 'mema';
		var files   = path.join( testData, project, 'files' );

		fs.readdir( files, function ( error, folders ) {
			if ( error ) {
				return grunt.fail.fatal( error );
			}

			async.eachSeries( folders, function ( folder, callback ) {
				var destination = require( path.join( files, folder, 'index.js' ) ).destination;
				var command     = 'cp -r ' + path.join( files, folder, 'data/ ', paths( 'base' ), destination );

				exec( command, callback );
			}, function ( error ) {
				if ( error  ) {
					return grunt.fail.fatal( error );
				}

				done();
			} );

		} );

	} );


	// files:remove
	grunt.registerTask( 'files:remove', 'removes files that were copied to their destination', function () {
		var done    = this.async();
		var project = 'mema';
		var files   = path.join( testData, project, 'files' );

		fs.readdir( files, function ( error, folders ) {
			if ( error ) {
				return grunt.fail.fatal( error );
			}

			async.eachSeries( folders, function ( folder, callback ) {

				fs.readdir( path.join( files, folder, 'data/'), function ( error, data ) {

					async.eachSeries( data, function ( datum, callback ) {
						var destination = require( path.join( files, folder, 'index.js' ) ).destination;
						var command     = 'rm -r ' + path.join( paths( 'base' ), destination, datum );

						exec( command, function ( error, stdout, stderr ) {
							callback();
						} );
					}, callback );

				} );

				// exec( command, callback );
			}, function ( error ) {
				if ( error  ) {
					return grunt.fail.fatal( error );
				}

				done();
			} );

		} );

	} );
};