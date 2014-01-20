define( 'Runtime', function ( require ) {
	'use strict';

	var Model         = require( 'Model' );
	var RuntimeConfig = require( 'RuntimeConfig' );
	var _             = require( 'lodash' );

	var Environments  = {
			'UNKNOWN'  : 0,
			'PAGETAB'  : 1,
			'CANVAS'   : 2,
			'PLATFORM' : 4
	};

	var runTime = new Model( {
			'AccessToken'     : '',
			'ClientID'        : '',
			'Environment'     : Environments.UNKNOWN,
			'Initialized'     : false,
			'KidDirectedSite' : undefined,
			'Locale'          : RuntimeConfig.locale,
			'LoginStatus'     : undefined,
			'Rtl'             : RuntimeConfig.rtl,
			'Scope'           : undefined,
			'Secure'          : undefined,
			'UseCookie'       : false,
			'UserID'          : '',
			'CookieUserID'    : ''
	} );

	_.extend( runTime, {
		'ENVIRONMENTS'  : Environments,
		'isEnvironment' : function ( env ) {
			var current = this.getEnvironment();
			return ( env | current ) === current;
		}
	} );

	( function () {
		// TODO  On FB, Canvas can do deeplinking, wide layout, and specific features
		// http://stackoverflow.com/questions/11635367/why-facebook-canvas-over-facebook-page-tab

		// var env = /app_runner/.test( window.name ) ? Environments.PAGETAB : /iframe_canvas/.test( window.name ) ? Environments.CANVAS : Environments.UNKNOWN;
		// if ( ( env | Environments.PAGETAB ) === env ) env = env | Environments.CANVAS;
		var env = Environments.PAGETAB;
		runTime.setEnvironment( env );
	} )();

	return runTime;
} );