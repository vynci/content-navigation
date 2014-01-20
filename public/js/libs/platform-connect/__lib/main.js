// define( 'main', function ( require ) {
	'use strict';

	console.log( "require:", require );
	window.PC || (function (window) {
		var self     = window;
		var document = window.document;

		require( 'Auth' );
		require( 'CssConfig' );
		require( 'PC' );
		require( 'Runtime' );
		require( 'RuntimeConfig' );
		require( 'ES5' );
		require( 'SDKConfig' );
		require( 'UserAgent' );
		require( 'domReady' );
		require( 'init' );

	} ).call( {}, window.inDapIF ? parent.window : window );

// } );