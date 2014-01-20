define('ES5', function(require, exports, module) {
	'use strict';

	var g = require('ES5ArrayPrototype'),
		h = require('ES5FunctionPrototype'),
		i = require('ES5StringPrototype'),
		j = require('ES5Array'),
		k = require('ES5Object'),
		l = require('ES5Date'),
		m = require('JSON3'),
		n = Array.prototype.slice,
		o = Object.prototype.toString,
		p = {
			'JSON.stringify': m.stringify,
			'JSON.parse': m.parse
		}, q = {
			array: g,
			'function': h,
			string: i,
			Object: k,
			Array: j,
			Date: l
		};
	for (var r in q) {
		if (!q.hasOwnProperty(r)) continue;
		var s = q[r],
			t = r === r.toLowerCase() ? window[r.replace(/^\w/, function(x) {
				return x.toUpperCase();
			})].prototype : window[r];
		for (var u in s) {
			if (!s.hasOwnProperty(u)) continue;
			var v = t[u];
			p[r + '.' + u] = v && /\{\s+\[native code\]\s\}/.test(v) ? v : s[u];
		}
	}

	function w(x, y, z) {
		var aa = n.call(arguments, 3),
			ba = z ? /\s(.*)\]/.exec(o.call(x).toLowerCase())[1] : x,
			ca = p[ba + '.' + y] || x[y];
		if (typeof ca === 'function') return ca.apply(x, aa);
	}
	module.exports = w;
});