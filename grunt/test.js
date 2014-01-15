'use strict';

var childProcess = require( 'child_process' );
var async        = require( 'async' );
var paths        = require( 'paths' );
var config       = require( paths( 'config' ) );
var fs           = require( 'fs' );
var _            = require( 'lodash' );
var slingProcess;

var slingCfgExists = fs.existsSync( '.sling.json' );
if ( slingCfgExists ) {
	var slingCfg = JSON.parse( fs.readFileSync( '.sling.json', 'utf8' ) );
	_.extend( config.rest, slingCfg );
	if ( slingCfg.resourceId ) {
		config.mongodb.database = slingCfg.resourceId
	}
}

module.exports = function ( grunt ) {

	grunt.loadNpmTasks( 'grunt-simple-mocha' );
	grunt.loadNpmTasks( 'grunt-mocha-phantomjs' );

	// Config for mocha phantomjs - test and coverage
	grunt.config.set( 'mocha_phantomjs', {
		'public-test' : {
			'options' : {
				'reporter' : 'spec',
				'urls'     : [ config.rest.protocol + config.rest.host + ':' + config.rest.port + '/test/public/index.html' ]
			}
		},
		'public-coverage-json' : {
			'options' : {
				'reporter' : 'json-cov',
				'output'   : 'test/coverage-report/coverage-public.json',
				'urls'     : [ config.rest.protocol + config.rest.host + ':' + config.rest.port + '/test/public/index.html' ]
			}
		},
		'public-coverage-html' : {
			'options' : {
				'reporter' : 'html-cov',
				'output'   : 'test/coverage-report/coverage-public.html',
				'urls'     : [ config.rest.protocol + config.rest.host + ':' + config.rest.port + '/test/public/index.html' ]
			}
		}
	} );

	// Config for simplemocha tests
	grunt.config.set( 'simplemocha', {
		'options' : {
			'globals'     : [ 'should' ],
			'timeout'     : 5000,
			'ignoreLeaks' : true,
			'ui'          : 'bdd',
			'reporter'    : 'spec'
		},

		'all' : {
			'src' : [ 'test/lib/*.js' ]
		},

		'e2e' : {
			'src' : [ 'test/e2e/**/*.js' ]
		}

	} );

	// Sling start task
	grunt.task.registerTask( 'sling-start', 'Start node server with sling', function () {
		var slingCfgExists = fs.existsSync( '.sling.json' );
		if ( slingCfgExists ) {
			slingProcess = childProcess.exec( 'sling start' );
		} else {
			slingProcess = childProcess.exec( 'sling start -P http://localhost:3000 -p ' + config.rest.port + ' -r ' + config.mongodb.database );
		}
	} );

	grunt.task.registerTask( 'sling-stop', 'Start node server with sling', function () {
		slingProcess.kill();
	} );

	// Load public test results in browser
	grunt.task.registerTask( 'load-public-tests', 'Load public tests in browser', function () {
		childProcess.exec( '/usr/bin/open -a "/Applications/Google Chrome.app" ' + config.rest.protocol + config.rest.host + ':' + config.rest.port + '/test/public/index.html' );
	} );

	// Run public tests
	grunt.registerTask( 'test:public', 'run mocha tests for public scripts', [
		'sling-start',
		'mocha_phantomjs:public-test',
		'sling-stop'
	] );

	// Run all tests (needs updating)
	grunt.registerTask( 'test', 'runs tests', [ 'simplemocha', 'test:public' ] );

	// Run end to end tests
	grunt.registerTask( 'test:e2e', 'runs all e2e tests', function () {
		var tasks = [ 'selenium:start', 'simplemocha:e2e' ];

		process.env[ 'seleniumServer' ] = true;

		grunt.task.run( tasks );
	} );

	// Run end to end tests locally
	grunt.registerTask( 'test:e2e:local', 'runs e2e tests locally', function () {
		grunt.task.run( 'simplemocha:e2e' );
	} );

};