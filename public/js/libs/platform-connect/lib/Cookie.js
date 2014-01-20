define( 'Cookie', function ( require ) {
	'use strict';

	var QueryString = require( 'QueryString' );
	var Runtime     = require( 'Runtime' );

	var _domain = null;

	var setCookie = function ( prefix, value, time ) {
		prefix = prefix + Runtime.ClientId;
		var path = _domain && _domain !== '.';
		if ( path ) {
			document.cookie = prefix + '=;  expires=Wed, 04 Feb 2004 08:00:00 GMT; ';
			document.cookie = prefix + '=;  expires=Wed, 04 Feb 2004 08:00:00 GMT; ' + 'domain=' + location.hostname + '; ';
		}
		var expires = new Date( time ).toGMTString();
		document.cookie = prefix + '=' + value + ( value && time === 0 ? '' : ';  expires=' + expires ) + ';  path=/' + ( path ? ';  domain=' + _domain : '' );
	};

	var getCookie = function ( value ) {
		value = value + Runtime.ClientId;
		var findValue = new RegExp( '\\b' + value + '=([^; ]*)\\b' );
		return findValue.test( document.cookie ) ? RegExp.$1 : null;
	};

	var Cookie = {
		'setDomain' : function ( domain ) {
			_domain = domain;
			var encodedDomain = QueryString.encode( {
				'base_domain' : _domain && _domain !== '.' ? _domain : ''
			} );
			var date = new Date();
			date.setFullYear( date.getFullYear() + 1 );
			setCookie( 'pcm_', encodedDomain, date.getTime() );
		},
		'getDomain' : function () {
			return _domain;
		},
		'loadMeta' : function () {
			var cookie = getCookie( 'pcm_' );
			if ( cookie ) {
				var decodedCookie = QueryString.decode( cookie );
				if ( !_domain ) {
					_domain = decodedCookie.base_domain;
				}
				return decodedCookie;
			}
		},
		'loadSignedRequest' : function () {
			return getCookie( 'pcsr_' );
		},
		'setSignedRequestCookie' : function ( value, time ) {
			if ( !value ) {
				throw new Error( 'Value passed to Cookie.setSignedRequestCookie ' + 'was empty.' );
			}
			setCookie( 'pcsr_', value, time );
		},
		'clearSignedRequestCookie' : function () {
			setCookie( 'pcsr_', '', 0 );
		},
		'setRaw' : setCookie
	};

	return Cookie;
} );