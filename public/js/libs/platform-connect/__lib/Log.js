define( 'Log', function ( require ) {
	'use strict';

	var ES5     = require( 'ES5' );
	var sprintf = require( 'sprintf' );

	var Level = {
		'DEBUG'   : 3,
		'INFO'    : 2,
		'WARNING' : 1,
		'ERROR'   : 0
	};

	var console = function ( output, level ) {
		// trim out the
		var message = Array.prototype.slice.call( arguments, 2 );
		// format
		message = sprintf.apply( null, message );
		var console = window.console;
		if ( console && Log.level >= level) console[ output in console ? output : 'log' ]( message );
	};

	var Log = {
		'level' : -1,
		'Level' : Level,
		'debug' : ES5( console, 'bind', true, null, 'debug', Level.DEBUG ),
		'info'  : ES5( console, 'bind', true, null, 'info', Level.INFO ),
		'warn'  : ES5( console, 'bind', true, null, 'warn', Level.WARNING ),
		'error' : ES5( console, 'bind', true, null, 'error', Level.ERROR )
	};

	return Log;
} );