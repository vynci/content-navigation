define( 'Runtime', function ( require ) {
	'use strict';

	var _             = require( 'lodash' );
	var RuntimeConfig = require( 'RuntimeConfig' );

	var Environments  = {
		'UNKNOWN'  : 0,
		'PAGETAB'  : 1,
		'CANVAS'   : 2,
		'PLATFORM' : 4
	};

	var RunTime = {
		'AccessToken'  : '',
		'ClientId'     : '',
		'CookieUserId' : '',
		'Environment'  : Environments.PAGETAB,
		'Initialized'  : false,
		'Locale'       : RuntimeConfig.locale,
		'LoginStatus'  : undefined,
		'Rtl'          : RuntimeConfig.rtl,
		'Scope'        : undefined,
		'Secure'       : undefined,
		'UseCookie'    : false,
		'UserId'       : ''
	};

	_.extend( RunTime, {
		'ENVIRONMENTS' : Environments,
	} );

	// ( function () {
	// 	// TODO  On FB, Canvas can do deeplinking, wide layout, and specific features
	// 	// http://stackoverflow.com/questions/11635367/why-facebook-canvas-over-facebook-page-tab

	// 	// var env = /app_runner/.test( window.name ) ? Environments.PAGETAB : /iframe_canvas/.test( window.name ) ? Environments.CANVAS : Environments.UNKNOWN;
	// 	// if ( ( env | Environments.PAGETAB ) === env ) env = env | Environments.CANVAS;
	// 	var env = Environments.PAGETAB;
	// 	RunTime.Environment = env;
	// } )();

	return RunTime;
} );