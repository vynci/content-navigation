/**
 * @classdesc Dispatcher object to relay messages.
 * @public
 * @constructor
 */
define( 'WindowProxyDispatcher' function ( require ) {
	'use strict';

	var WindowProxy = require( 'WindowProxy' );
	var Log         = require( 'Log' );

	var WindowProxyDispatcher = {
		/**
		 * Forward a message event to the target window
		 * @private
		 */
		forwardMessageEvent: function(e) {
			var message,
				decode = window.decodeURIComponent,
				targetWindow,
				windowProxy;

			if (document.location.hash.length > 0) {
				// Eat the hash character
				message = WindowProxy.unserialize(decode(document.location.hash.substr(1)));

				targetWindow = WindowProxy.getTargetWindow(message.targetWindowName);

				windowProxy =
					WindowProxyDispatcher.findWindowProxyObjectInWindow(
						targetWindow,
						message.sourceWindowName
					);

				if (windowProxy) {
					if (windowProxy.origin === message.targetOrigin || message.targetOrigin === '*') {
						windowProxy.dispatchEvent(
						  new MessageEvent(message.data, message.sourceOrigin, windowProxy));
					} else {
						Log.error('Target origin ' +
									   windowProxy.origin +
									   ' does not match desired target of ' +
									   message.targetOrigin);
					}
				} else {
					Log.error('Could not find window proxy object on the target window');
				}
			}
		},

		/**
		 * Look for a window proxy object in the target window
		 * @private
		 */
		findWindowProxyObjectInWindow: function(w, sourceWindowName) {
			var i;

			// IE does not enumerate global objects on the window object
			if (w.RuntimeObject) {
				w = w.RuntimeObject();
			}
			if (w) {
				for (i in w) {
					if (w.hasOwnProperty(i)) {
						try {
							// Ensure that we're finding the proxy object
							// that is declared to be targetting the window that is calling us
							if (w[i] !== null &&
								typeof w[i] === 'object' &&
								w[i] instanceof w.WindowProxyBase &&
								w[i].getTargetWindowName() === sourceWindowName) {
								return w[i];
							}
						} catch(e) {
							// Swallow exception in case we access an object we shouldn't
						}
					}
				}
			}
			return null;
		},

		/**
		 * Start a proxy to relay messages.
		 * @public
		 */
		start: function() {
			if (window.addEventListener) {
				window.addEventListener('resize',
										WindowProxyDispatcher.forwardMessageEvent,
										false);
			} else if (document.body.attachEvent) {
				window.attachEvent('onresize', WindowProxyDispatcher.forwardMessageEvent);
			} else {
				// Should never happen
				Log.error('Cannot attach resize event');
			}
		}
	};

	return WindowProxyDispatcher;
} );