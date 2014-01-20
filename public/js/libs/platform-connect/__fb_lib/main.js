/*1382561129,180634169,JIT Construction: v976458,en_US*/
/**
 * Copyright Facebook Inc.
 *
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
try {
    window.FB || (function (window) {
        var self = window,
            document = window.document;
        var setTimeout = window.setTimeout,
            setInterval = window.setInterval;
        var defineEV__ = 0;

        function emptyFunction() {};
        var __w, __t;
        __t = function (a) {
            return a[0];
        };
        __w = function (a) {
            return a;
        };
        var require, define;

        (function (a) {
            var b = {}, c = {}, d = ['global', 'require', 'requireDynamic', 'requireLazy', 'module', 'exports'];
            require = function (e, f) {
                if (c.hasOwnProperty(e)) return c[e];
                if (!b.hasOwnProperty(e)) {
                    if (f) return null;
                    throw new Error('Module ' + e + ' has not been defined');
                }
                var g = b[e],
                    h = g.deps,
                    i = h.length,
                    j, k = [];
                for (var l = 0; l < i; l++) {
                    switch (h[l]) {
                    case 'module':
                        j = g;
                        break;
                    case 'exports':
                        j = g.exports;
                        break;
                    case 'global':
                        j = a;
                        break;
                    case 'require':
                        j = require;
                        break;
                    case 'requireDynamic':
                        j = require;
                        break;
                    case 'requireLazy':
                        j = null;
                        break;
                    default:
                        j = require.call(null, h[l]);
                    }
                    k.push(j);
                }
                g.factory.apply(global, k);
                c[e] = g.exports;
                return g.exports;
            };

            define = function (e, f, g, h) {
                switch (typeof g) {
                case 'function':
                    b[e] = {
                        factory: g,
                        deps: d.concat(f),
                        exports: {}
                    };
                    if (h === 3) require.call(null, e);
                    break;
                case 'object':
                    c[e] = g;
                    break;
                default:
                    throw new TypeError('Wrong type for factory object');
                }
            };
        })(this);
        var ES5 = function () {

            ES5 = require('ES5');
            return ES5.apply(null, arguments);
        };

    }).call({}, window.inDapIF ? parent.window : window);
} catch (e) {
    // new Image().src = "http:\/\/www.facebook.com\/" + 'common/scribe_endpoint.php?c=jssdk_error&m=' + encodeURIComponent('{"error":"LOAD", "extra": {"name":"' + e.name + '", "line":"' + (e.lineNumber || e.line) + '", "script":"' + (e.fileName || e.sourceURL || e.script) + '", "stack":"' + (e.stackTrace || e.stack) + '", "message":"' + e.message + '"}}');
}