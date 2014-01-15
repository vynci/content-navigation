'use strict';

var server;

// Used by tests to get either the instrumented code coverage `server.js` or the regular one
if ( process.env.NODE_ENV !== 'coverage' ) {
	server = require( './lib/server' );
} else {
	server = require( './lib-cov/server' );
}

// Suppress util.log's in HTML coverage or terminal for tests
var util = require( 'util' );
util.log = function () {};

module.exports = server;