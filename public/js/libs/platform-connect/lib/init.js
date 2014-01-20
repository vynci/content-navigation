define( 'init', function ( require ) {
	'use strict';

	var _            = require( 'lodash' );
	var Runtime      = require( 'Runtime' );
	var EventEmitter = require( 'EventEmitter' );


	return function ( options, callback ) {
		if ( Runtime.Initialized ) {
			console.warn( 'PC.init has already been called - this could indicate a problem' );
		}
		if ( !options.appId ) {
			throw new Error( 'appId not found' );
		}
		Runtime.ClientId = options.appId;
		Runtime.Scope = options.scope || undefined;
		Runtime.UseCookie = options.cookie || false;
		Runtime.Initialized = true;

		EventEmitter.fire( 'init:complete', options );

		if ( callback ) {
			callback();
		}
	};

} );