define( 'main', function ( require ) {
	'use strict';

	var PC = window.PC = {
		'init'       : require( 'init' ),
		'Auth'       : require( 'Auth' ),
		'Observable' : require( 'Observable' )
	};

	// check for pcInitHook hook

	if ( window.pcInitHook && !window.pcInitHook.hasRun ) {
		window.pcInitHook.hasRun = true;
		window.pcInitHook();
	}

	return PC;
} );