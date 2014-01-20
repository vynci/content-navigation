define( 'SDKConfig', {
	'bustCache'       : true,
	'errorHandling'   : {
		'rate' : 4
	},
	'usePluginPipe' : true,

	'features'      : {},

	'api' : {
		'mode'      : 'warn',
		'whitelist' : [ 'Data', 'Data.process', 'Data.query', 'Data.query:wait', 'Data.waitOn', 'Data.waitOn:wait', 'Event', 'Event.subscribe', 'Event.unsubscribe', 'UA', 'UA.nativeApp', 'api', 'getAccessToken', 'getAuthResponse', 'getLoginStatus', 'getUserID', 'init', 'login', 'logout', 'ui', 'ui:subscribe' ]
	},

	'initSitevars' : {
		'iframePermissions' : {}
	}
} );