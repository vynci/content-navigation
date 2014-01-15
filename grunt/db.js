'use strict';

var async  = require( 'async' );
var fs     = require( 'fs' );
var path   = require( 'path' );
var fs     = require( 'fs' );
var exec   = require( 'child_process' ).exec;

var paths    = require( 'paths' );
var testData = paths( 'testData' );

module.exports = function ( grunt ) {

	// db:export:<branch>
	grunt.registerTask( 'db:export', 'exports the current db to json and commits to github', function () {
		var done  = this.async();

		// args
		var project = 'mema';
		var db      = 'mema';
		var branch  = this.args[ 0 ] || 'master';

		async.series( [

			// mongoexport (to JSON)
			function ( callback ) {
				grunt.log.writeln( 'Exporting to JSON.' );
				var collections;

				async.series( [

					// get collections
					function ( callback ) {
						exec( 'mongo ' + db + ' --quiet --eval "db.getCollectionNames()"', function ( error, stdout, stderror ) {
							if ( !error ) {
								collections = stdout.replace( /\n/, '' ).split( ',' );
							}
							callback( error );
						} );
					},

					// export each
					function ( callback ) {
						async.each( collections, function ( collection, callback ) {
							exec( 'mongoexport -d ' + db + ' -c ' + collection + ' -o ' + path.join( testData, project, 'db', collection + '.json' ), callback );
						}, callback );
					}
				], function ( error, results ) {
					grunt.log.writeln( 'Exported to JSON.' );
					callback( error );
				} );
			},

			// github push
			function ( callback ) {
				grunt.log.writeln( 'Pushing to github.' );
				var options = { 'cwd' : testData };

				exec( 'git add -A && git commit && git push origin ' + branch, options, function ( error, stdout, stderr ) {
					grunt.log.writeln( stdout );

					callback( error );
				} );
			}
		], done );
	} );


	// db:reset:<type(json|bson)>:<branch>
	grunt.registerTask( 'db:reset', 'project will be reset from local bson or pulls from github and resets from json - db:reset:<type (json|bson)>:<project>:<branch>:<database>', function () {
		var done  = this.async();

		// args
		var project = 'mema';
		var db      = 'mema';

		// If `bson` or `json` aren't the first arg, inject `bson`
		if ( this.args[ 0 ] !== 'bson' && this.args[ 0 ] !== 'json' ) {
			this.args.unshift( 'bson' );
		}
		var type    = this.args[ 0 ];
		var branch  = this.args[ 1 ] || 'master';

		async.series( [

			// mongorestore (from bson)
			function ( callback ) {

				// bypass bson if resetting from github `json`
				if ( type !== 'bson' ) {
					 return callback();
				}

				grunt.log.writeln( 'Restoring from BSON.' );
				exec( 'mongorestore --drop -d ' + db + ' --dir ' + path.join( testData, project, 'db', 'bson' ), function ( error, stdout, stderror ) {
					if ( error ) {
						return grunt.fail.fatal( error );
					}
					grunt.log.writeln( 'Restored from BSON.' );

					done();
				} );
			},

			// mongoimport (from json)
			function ( callback ) {
				grunt.log.writeln( 'Importing from JSON.' );

				var collections;

				async.series( [

					// get json files
					function ( callback ) {
						fs.readdir( path.join( testData, project, 'db' ), function ( error, files ) {
							collections = files.filter( function ( value, index, array ) {
								return value.match( /.json$/ );
							} );

							callback( error );
						} );
					},

					// import each
					function ( callback ) {
						async.each( collections, function ( collection, callback ) {
							exec( 'mongoimport --drop -d ' + db + ' -c ' + path.basename( collection, '.json' ) + ' --file ' + path.join( testData, project, 'db', collection ), callback );
						}, callback );
					}
				], function ( error, results ) {
					grunt.log.writeln( 'Imported from JSON.' );
					callback( error );
				} );
			},

			// mongodump (to bson)
			function ( callback ) {
				grunt.log.writeln( 'Dumping to BSON.' );
				exec( 'mongodump -d ' + db + ' -o ' + path.join( testData, project, 'db', 'bson' ), callback );
			},

			// move bson
			function ( callback ) {
				exec( 'mv -f ' + path.join( testData, project, 'db', 'bson', db, '*' ) + ' ./', { 'cwd' : path.join( testData, project, 'db', 'bson' ) }, function () {
					grunt.log.writeln( 'Dumped to BSON.' );
					exec( 'rm -r ' + path.join( testData, project, 'db', 'bson', db ), callback );
				} );
			}
		], function ( error ) {
			if ( error  ) {
				return grunt.fail.fatal( error );
			}

			done();
		} );

	} );
};