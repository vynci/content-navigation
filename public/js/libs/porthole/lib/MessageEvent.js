/**
 * @classdesc Event object to be passed to registered event handlers
 * @class
 * @param {String} data
 * @param {String} origin - url of window sending the message
 * @param {Object} source - window object sending the message
 */
define( 'MessageEvent', function ( require ) {
	'use strict';

	var MessageEvent = function (data, origin, source) {
		this.data = data;
		this.origin = origin;
		this.source = source;
	};

	return MessageEvent;
} );