'use strict';

var childProcess = require( 'child_process' );
var async        = require( 'async' );
var fs           = require( 'fs' );

module.exports = function ( grunt ) {

	var libCoverageFile    = 'test/coverage-report/coverage-lib.html';
	var publicCoverageFile = 'test/coverage-report/coverage-public.json';

	// Instrument code coverage – lib
	grunt.task.registerTask( 'instrument-lib', 'Instrument lib files', function () {
		childProcess.exec( 'jscoverage lib lib --exclude dev-utils,config' );
	} );

	// Instrument code coverage – public
	grunt.task.registerTask( 'instrument-public', 'Instrument public files', function () {
		childProcess.exec( 'jscoverage public/js public/js --exclude=libs' );
	} );

	// Check for uncommitted changes and abort if any
	grunt.task.registerTask( 'uncommitted-check', 'Instrument public files', function () {
		childProcess.exec( 'git diff public/ lib/', function ( error, stdout, stderr ) {
			if ( error ) {
				grunt.log.error( error );
			}

			if ( stdout ) {
				return grunt.fail.fatal( 'Please commit any changes you have made before running coverage.' );
			}
		} );
	} );

	// Remove minified main and coverage file
	grunt.task.registerTask( 'coverage-cleanup', 'Remove instrumented code', function () {
		grunt.log.writeln( 'Removing instrumented code and coverage files' );

		childProcess.exec( 'rm -f public/js/main.min.js' );
		childProcess.exec( 'rm -fr test/coverage-report' );
	} );

	// Load lib coverage report in browser
	grunt.task.registerTask( 'load-lib-coverage-report', 'Load lib coverage in browser', function () {
		var contents = fs.readFileSync( libCoverageFile, 'utf8' ).replace( new RegExp( 'lib/'.replace( /\//g, '\\/' ), 'g' ), '' );
		fs.writeFileSync( libCoverageFile, contents );

		childProcess.exec( '/usr/bin/open -a "/Applications/Google Chrome.app" ' + libCoverageFile, function () {} );
	} );

	// Load public coverage report in browser
	grunt.task.registerTask( 'load-public-coverage-report', 'Load public coverage in browser', function () {
		childProcess.exec( '/usr/bin/open -a "/Applications/Google Chrome.app" ' + publicCoverageFile, function () {} );
	} );

	// Remove instrumented code
	grunt.task.registerTask( 'un-instrument', 'Remove instrumented code', function () {
		var done = this.async();

		async.series( [
		    function ( callback ) {
				childProcess.exec( 'git checkout -- lib', function ( error, stdout, stderr ) {
			        callback();
				} );
		    },
		    function ( callback ) {
				childProcess.exec( 'git checkout -- public/js', function ( error, stdout, stderr ) {
			        callback();
				} );
		    }
		],
		function ( error, results ) {
			done();
		} );
	} );

	// Create coverage report for lib (back-end)
	grunt.task.registerTask( 'lib-coverage', 'Remove instrumented code', function () {
		var done = this.async();

		process.env.NODE_ENV = 'coverage';

		childProcess.exec( '_mocha test/lib --recursive --reporter html-cov --ui bdd > ' + libCoverageFile, function ( error, stdout, stderr ) {
			if ( error ) {
				grunt.log.error( error );
			}
	        done();
		} );
	} );

	// Run grunt tasks for back-end coverage
	grunt.registerTask( 'coverage:lib', 'run mocha coverage for public scripts', [
		'un-instrument',
		'uncommitted-check',
		'instrument-lib',
		'lib-coverage',
		'un-instrument',
		'load-lib-coverage-report'
	] );

	// Run grunt tasks for front-end coverage
	grunt.registerTask( 'coverage:public', 'run mocha coverage for public scripts', [
		'un-instrument',
		'sling-start',
		'instrument-public',
		'mocha_phantomjs:public-coverage-json',
		'un-instrument',
		'load-public-coverage-report'
	] );

	// Run coverage on front-end & back-end
	grunt.registerTask( 'coverage', 'run mocha coverage for public scripts', [
		'coverage:lib',
		'coverage:public'
	] );

};