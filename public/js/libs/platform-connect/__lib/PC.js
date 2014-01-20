define( 'PC', function ( require ) {
	'use strict';

	var _             = require( 'lodash' );

	var SDKConfig     = require( 'SDKConfig' );
	var RuntimeConfig = require( 'RuntimeConfig' );
	var CssConfig     = require( 'CssConfig' );
	var Auth          = require( 'Auth' );
	var domReady      = require( 'domReady' );
	var DOMWrapper    = require( 'DOMWrapper' );
	var Content       = require( 'Content' );
	var Runtime       = require( 'Runtime' );
	var Log           = require( 'Log' );
	var ES5           = require( 'ES5' );
	var dotAccess     = require( 'dotAccess' );
	// var DOM           = require( 'DOM' );

	var apis;
	var mode = SDKConfig.api.mode;
	console.log( "window.PC:", window.PC );
	var PC = window.PC = {};

	Log.level = 1;
	// p.setPrefix( 'FB.__globalCallbacks' );
	var div = document.createElement( 'div' );
	DOMWrapper.setRoot( div );
	domReady( function() {
		Log.info( 'domReady' );
		Content.appendHidden( div );
		// TODO
		// if ( CssConfig.rules ) {
		// 	l.addCssRules( CssConfig.rules, CssConfig.components );
		// }
	} );

	Runtime.subscribe( 'AccessToken.change', function( status ) {
		if ( ! status  && Runtime.getLoginStatus() === 'connected' ) {
			Auth.getLoginStatus( null, true );
		}
	} );

	if ( dotAccess( SDKConfig, 'api.whitelist.length' ) ) {
		apis = {};
		ES5( SDKConfig.api.whitelist, 'forEach', true, function( api ) {
			apis[ api ] = 1;
		} );
	}

	var resolve = function ( option, path, key, options ) { //( option, api, fa, options ) {
		// var mode;

		// function map( array ) {
		// 	if ( ES5( 'Array', 'isArray', false, array ) ) {
		// 		return ES5( array, 'map', true, map );
		// 	}
		// 	if ( array && typeof array === 'object' && array.__wrapped ) {
		// 		return array.__wrapped;
		// 	}
		// 	return typeof array === 'function' && /^function/.test( array.toString() ) ? m.unguard( array ) : array;
		// }
		// var ja = ES5( Array.prototype.slice.call( arguments ), 'map', true, map );
		// var ka = option.apply( options, ja );
		// var la;
		// var ma = true;
		// if ( ka && typeof ka === 'object' ) {
		// 	var fn = Function();
		// 	fn.prototype = ka;
		// 	la = new fn();
		// 	la.__wrapped = ka;
		// 	for ( var oa in ka ) {
		// 		var pa = ka[ oa ];
		// 		if ( typeof pa !== 'function' || oa === 'constructor' ) continue;
		// 		ma = false;
		// 		la[ oa ] = ba( pa, api + ':' + oa, oa, ka );
		// 	}
		// }
		// if ( !ma ) return la;
		// return ma ? ka : la;
	};

	var _pc = function ( api, options ) {
		var fa = api ? dotAccess( PC, api, true ) : PC;
		ES5( ES5( 'Object', 'keys', false, options ), 'forEach', true, function ( key ) {
			var option = options[ key ];
			if ( typeof option === 'function' ) {
				var path = ( api ? api + '.' : '' ) + key;
				Log.debug( "option:", option );
				Log.debug( "path:", path );
				Log.debug( "key:", key );
				Log.debug( "options:", options );
				// var resolvedAPI = resolve( option, path, key, options );
				// if ( resolvedAPI ) {
				// 	fa[ key ] = resolvedAPI;
				// }
			}
		} );
	};

	Runtime.setSecure( ( function () {
		var isApp = /iframe_canvas|app_runner/.test( window.name );
		var isDialog = /dialog/.test( window.name );
		if ( location.protocol === 'https:' && ( window === top || !( isApp || isDialog) ) ) {
			return true;
		}
		if ( /_pc_https?/.test( window.name ) ) {
			return ES5( window.name, 'indexOf', true, '_pc_https' ) !== -1;
		}
	} )() );

	_.extend( PC, {
		'provide' : _pc
	} );

	return PC;
} );