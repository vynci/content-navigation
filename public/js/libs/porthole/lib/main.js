/*
	Copyright (c) 2011-2012 Ternary Labs. All Rights Reserved.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/
define( 'main', function ( require ) {
	'use strict';

	/**
	 * @overview Porthole, JavaScript Library for Secure Cross Domain iFrame Communication.
	 * @author <a href="mailto:georges@ternarylabs.com">Georges Auberger</a>
	 * @copyright 2011-2012 Ternary Labs, All Rights Reserved.
	 *
	 * Namespace for Porthole
	 * @module Porthole
	 */

	var Log = require( 'Log' );
	var Porthole = {
		'trace'             : Log.trace,
		'error'             : Log.error,
		'WindowProxyLegacy' : require( 'WindowProxyLegacy' ),
		'WindowProxyHTML5'  : require( 'WindowProxyHTML5' )
	};

	if (!window.postMessage) {
		Porthole.trace('Using legacy browser support');
		Porthole.WindowProxy = Porthole.WindowProxyLegacy.extend({});
	} else {
		Porthole.trace('Using built-in browser support');
		Porthole.WindowProxy = Porthole.WindowProxyHTML5.extend({});
	}


	// // Support testing in node.js:
	// if (typeof window.exports !== 'undefined') {
	// 	window.exports.Porthole = Porthole;
	// } else {
	// 	window.Porthole = Porthole;
	// }

	return Porthole;
});
