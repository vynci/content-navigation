# platform-connect

A library to connect resource apps to the platform.  Normal development will only involve dynamic loading of the script.


## Setup

```shell
npm install
bower install
```


## API

### PC.loginStatus
Dispatched after a successful `PC.Auth.getLoginStatus` call
```js
PC.Observable.subscribe( 'PC.loginStatus', function ( response ) {} );
```


## Loading the SDK

The compiled library will be found at the platform under `/public/connect/platform-connect.js`, e.g. `http://localhost:3000/public/connect/platform-connect.js`.


### Dynamic

Add the follow to a `<script>` tag in your `index.html`:
```js
window.pcInitHook = function () {
	PC.init( {
		'appId'  : '<your resource id>', // App ID from the app dashboard
		'cookie' : true,                 // to store it in a cookie
		'status' : true                  // get login status automatically
	} );
	// Additional initialization code such as adding Event Listeners goes here
};

// Load the SDK asynchronously
( function( d, s, id ) {
	var js;
	var pcjs = d.getElementsByTagName( s )[ 0 ];
	if ( d.getElementById( id ) ) {
		return;
	}
	js = d.createElement( s );
	js.id = id;
	js.src = '//localhost:3000/public/connect/platform-connect.js';
	pcjs.parentNode.insertBefore( js, pcjs );
}( document, 'script', 'platform-connect-jssdk' ) );
```


### Dynamic with requirejs
This library exports an AMD module, and can be used with requirejs.

```js
require.config( {
	'paths' : {
		'platform-connect' : 'http://localhost:3000/public/connect/platform-connect'
	}
} );
```


## Support
Please create an issue to help us track integration problems or API questions as this library matures.

