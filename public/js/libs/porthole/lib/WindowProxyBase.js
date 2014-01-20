define( 'WindowProxyBase', function ( require ) {
    'use strict';

    var Class = require( 'Class' );
    var JSON  = require( 'JSON' );

    var WindowProxyBase = Class.extend({
        init: function(targetWindowName) {
            if (targetWindowName === undefined) {
                targetWindowName = '';
            }
            this.targetWindowName = targetWindowName;
            this.origin = window.location.protocol + '//' + window.location.host;
            this.eventListeners = [];
        },

        getTargetWindowName: function() {
            return this.targetWindowName;
        },

        getOrigin: function() {
            return this.origin;
        },

        /**
         * Lookup window object based on target window name
         * @private
         * @return {string} targetWindow
         */
        getTargetWindow: function() {
            return this._getTargetWindow(this.targetWindowName);
        },

        post: function(data, targetOrigin) {
            if (targetOrigin === undefined) {
                targetOrigin = '*';
            }
            this.dispatchMessage({
                'data' : data,
                'sourceOrigin' : this.getOrigin(),
                'targetOrigin' : targetOrigin,
                'sourceWindowName' : window.name,
                'targetWindowName' : this.getTargetWindowName()
            });
        },

        addEventListener: function(f) {
            this.eventListeners.push(f);
            return f;
        },

        removeEventListener: function(f) {
            var index;
            try {
                index = this.eventListeners.indexOf(f);
                this.eventListeners.splice(index, 1);
            } catch(e) {
                this.eventListeners = [];
            }
        },

        dispatchEvent: function(event) {
            var i;
            for (i = 0; i < this.eventListeners.length; i++) {
                //try {
                    this.eventListeners[i](event);
                //} catch(e) {
                //}
            }
        },


        /**
         * Serialize an object using JSON.stringify
         *
         * @param {Object} obj The object to be serialized
         * @return {String}
         */
        serialize: function(obj) {
            if (typeof JSON === 'undefined') {
                throw new Error('Porthole serialization depends on JSON!');
            }

            return JSON.stringify(obj);
        },

        /**
         * Unserialize using JSON.parse
         *
         * @param {String} text Serialization
         * @return {Object}
         */
        unserialize: function(text) {
            if (typeof JSON === 'undefined') {
                throw new Error('Porthole unserialization dependens on JSON!');
            }
            try {
                var json = JSON.parse(text);
                return json;
            } catch (e) {
                return false;
            }
        },

        _getTargetWindow: function(targetWindowName) {
            if (targetWindowName === '') {
                return top;
            } else if (targetWindowName === 'top' || targetWindowName === 'parent') {
                return window[targetWindowName];
            }
            return parent.frames[targetWindowName];
        }
    });

    return WindowProxyBase;
});