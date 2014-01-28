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
			'backbone-associations'	   : 'libs/backbone-associations/backbone-associations',
			'backbone.babysitter'      : 'libs/backbone.babysitter/lib/amd/backbone.babysitter',
			'backbone.wreqr'           : 'libs/backbone.wreqr/lib/amd/backbone.wreqr',
			'supermodel'			   : 'libs/supermodel/supermodel',
			'text'                     : 'libs/requirejs-text/text',
			'async'                    : 'libs/async/lib/async',
			'jquery-cookie'            : 'libs/jquery.cookie/jquery.cookie',
			'modernizr'                : 'libs/modernizr/modernizr',
			'fine-uploader'            : 'libs/fine-uploader/build/jquery.fineuploader',
			'base64'                   : 'libs/base64', // *! utility to encode/decode
			'porthole'                 : 'libs/porthole/src/porthole.min', // *! platform <--> app communication
			'shim'                     : 'libs/shim', // *! utility for object prototypes
			'MiddlewareRouter'         : 'libs/marionette-middleware-router/MiddlewareRouter', // *! custom marionette router similar to express
			'jquery-videoplayer'	   : 'libs/jquery.videoPlayer/jquery.invokeVideoPlayer',

			// Portfolio dependencies
			'jquery-easing'				: 'libs/portfolio/jqueryjquery.easing.1.3.min',
			'jquery-imagesloaded'		: 'libs/portfolio/jquery.imagesloaded.min',
			'jquery-scrollTo'			: 'libs/portfolio/jquery.scrollTo-1.4.3.1-min',
			'jquery-touchSwipe'			: 'libs/portfolio/jquery.touchSwipe.min',
			'spin'						: 'libs/portfolio/spin.min',
			'portfolio'					: 'libs/portfolio/portfolio',


			// expander dependencies
			'expander'					: 'libs/expander/grid',


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
			'jquery-videoplayer': {
				'deps' : ['jquery', 'underscore']
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
