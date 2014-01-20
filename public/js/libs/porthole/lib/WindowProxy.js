
    /**
     * @class
     * @classdesc Proxy window object to post message to target window
     * @param {string} proxyIFrameUrl - Fully qualified url to proxy iframe
     * @param {string} targetWindowName - Name of the proxy iframe window
     */

define( 'WindowProxy', function ( require ) {
	'use strict';

	var WindowProxy = function(){};

    WindowProxy.prototype = {
        /**
         * Post a message to the target window only if the content comes from the target origin.
         * <code>targetOrigin</code> can be a url or *
         * @public
         * @param {Object} data - Payload
         * @param {String} targetOrigin
         */
        post: function(data, targetOrigin) {},
        /**
         * Add an event listener to receive messages.
         * @public
         * @param {Function} eventListenerCallback
         * @returns {Function} eventListenerCallback
         */
        addEventListener: function(f) {},
        /**
         * Remove an event listener.
         * @public
         * @param {Function} eventListenerCallback
         */
        removeEventListener: function(f) {}

    };

	return WindowProxy;
} );