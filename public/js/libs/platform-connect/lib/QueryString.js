define( 'QueryString', function ( require ) {
	'use strict';

	var _ = require( 'lodash' );

	var encode = function ( obj ) {
		var queryString = [];
		_.each( _.keys( obj ), function ( key ) {
			var val = obj[ key ];
			if ( typeof val === 'undefined') {
				return;
			}
			if (val === null) {
				queryString.push( key );
				return;
			}
			queryString.push( encodeURIComponent( key ) + '=' + encodeURIComponent( val ) );
		} );
		return queryString.join( '&' );
	};

	var decode = function ( source, validate) {
		var queryObject = {};
		if (source === '') {
			return queryObject;
		}
		var objects = source.split( '&' );
		for (var o = 0; o < objects.length; o++) {
			var pair = objects[o].split( '=', 2);
			var key = decodeURIComponent( pair[ 0 ] );
			if ( validate && queryObject.hasOwnProperty( key ) ) {
				throw new URIError( 'Duplicate key: ' + key );
			}
			queryObject[ key ] = pair.length === 2 ? decodeURIComponent( pair[ 1 ] ) : null;
		}
		return queryObject;
	};

	function appendToUrl ( url, value) {
		return url + ( url.indexOf('?') ? '&' : '?') + ( typeof value === 'string' ? value : QueryString.encode( value ) );
	}
	var QueryString = {
		'encode'      : encode,
		'decode'      : decode,
		'appendToUrl' : appendToUrl
	};

	return QueryString;
} );