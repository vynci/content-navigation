/**
 * Implementation for modern browsers that supports it
 */
define( 'WindowProxyHTML5', function ( require ) {
	'use strict';

	var WindowProxyBase = require( 'WindowProxyBase' );
	// var WindowProxy     = require( 'WindowProxy' );
	var MessageEvent    = require( 'MessageEvent' );

	var WindowProxyHTML5 = WindowProxyBase.extend({
		init: function(proxyIFrameUrl, targetWindowName) {
			this._super(targetWindowName);
			this.eventListenerCallback = null;
		},

		dispatchMessage: function(message) {
			this.getTargetWindow().postMessage(this.serialize(message), message.targetOrigin);
		},

		addEventListener: function(f) {
			if (this.eventListeners.length === 0) {
				var self = this;
				if (window.addEventListener) {
					this.eventListenerCallback = function(event) { self.eventListener(self, event); };
					window.addEventListener('message', this.eventListenerCallback, false);
				} else if (window.attachEvent) {
				// Make IE8 happy, just not that 1. postMessage only works for IFRAMES/FRAMES http://blogs.msdn.com/b/ieinternals/archive/2009/09/16/bugs-in-ie8-support-for-html5-postmessage-sessionstorage-and-localstorage.aspx
					this.eventListenerCallback = function(event) { self.eventListener(self, window.event); };
					window.attachEvent('onmessage', this.eventListenerCallback);
				}
			}
			return this._super(f);
		},

		removeEventListener: function(f) {
			this._super(f);

			if (this.eventListeners.length === 0) {
				if (window.removeEventListener) {
					window.removeEventListener('message', this.eventListenerCallback);
				} else if (window.detachEvent) { // Make IE8, happy, see above
					// see jquery, detachEvent needed property on element, by name of that event, to properly expose it to GC
					if (typeof window.onmessage === 'undefined') window.onmessage = null;
					window.detachEvent('onmessage', this.eventListenerCallback);
				}
				this.eventListenerCallback = null;
			}
		},

		eventListener: function(self, nativeEvent) {
			var data = this.unserialize(nativeEvent.data);
			if (data && (self.targetWindowName == '' || data.sourceWindowName == self.targetWindowName)) {
				self.dispatchEvent(new MessageEvent(data.data, nativeEvent.origin, self));
			}
		}
	});

	return WindowProxyHTML5;
} );