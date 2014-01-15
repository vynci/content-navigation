define( function ( require ) {
	'use strict';

	var Marionette       = require( 'marionette' );
	var MiddlewareRouter = require( 'MiddlewareRouter' );

	return Marionette.MiddlewareRouter.extend( {

		'appRoutes' : {
			'*actions' : 'showDefault'
		}

	} );

} );
