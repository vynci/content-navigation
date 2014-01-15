( function () {
	'use strict';

	require.config( {

		'baseUrl' : 'js',

		'paths' : {

			// Libraries and utility scripts
			'jquery'                   : 'libs/jquery/jquery',
			'bootstrap'                : 'libs/bootstrap/docs/assets/js/bootstrap',
			'underscore'               : 'libs/lodash/lodash',
			'backbone'                 : 'libs/backbone-amd/backbone',
			'marionette'               : 'libs/backbone.marionette/lib/core/amd/backbone.marionette',
			'backbone.babysitter'      : 'libs/backbone.babysitter/lib/amd/backbone.babysitter',
			'backbone.wreqr'           : 'libs/backbone.wreqr/lib/amd/backbone.wreqr',
			'text'                     : 'libs/requirejs-text/text',
			'async'                    : 'libs/async/lib/async',
			'jquery-cookie'            : 'libs/jquery.cookie/jquery.cookie',
			'modernizr'                : 'libs/modernizr/modernizr',
			'fine-uploader'            : 'libs/fine-uploader/build/jquery.fineuploader',
			'base64'                   : 'libs/base64', // *! utility to encode/decode
			'porthole'                 : 'libs/porthole/src/porthole.min', // *! platform <--> app communication
			'shim'                     : 'libs/shim', // *! utility for object prototypes
			'MiddlewareRouter'         : 'libs/marionette-middleware-router/MiddlewareRouter', // *! custom marionette router similar to express


			// root folders
			'models'                   : 'models',
			'collections'              : 'collections',
			'views'                    : 'views',
			'templates'                : '../templates',

			// Base application level classes
			'App'                      : 'App',
			'Communicator'             : 'Communicator',
			'Router'                   : 'routers/AppRouter',
			'Controller'               : 'controllers/AppController'
		},

		'shim' : {
			'bootstrap' : {
				'deps' : [ 'jquery' ]
			},
			'deps' : [ 'jquery', 'underscore' ]
		}
	},
	require( [ 'App', 'config/index' ],
		function ( App ) {
			return App.start();
		} )
	);

} ).call( this );
