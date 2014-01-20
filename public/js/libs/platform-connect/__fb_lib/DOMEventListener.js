define( 'DOMEventListener', function ( require ) {
            var g = require('wrapFunction'),
                h, i;
            if (window.addEventListener) {
                h = function (k, l, m) {
                    m.wrapper = g(m, 'entry', k + ':' + l);
                    k.addEventListener(l, m.wrapper, false);
                };
                i = function (k, l, m) {
                    k.removeEventListener(l, m.wrapper, false);
                };
            } else if (window.attachEvent) {
                h = function (k, l, m) {
                    m.wrapper = g(m, 'entry', k + ':' + l);
                    k.attachEvent('on' + l, m.wrapper);
                };
                i = function (k, l, m) {
                    k.detachEvent('on' + l, m.wrapper);
                };
            }
            var j = {
                add: function (k, l, m) {
                    h(k, l, m);
                    return {
                        remove: function () {
                            i(k, l, m);
                            k = null;
                        }
                    };
                },
                remove: i
            };
            module.exports = j;
        });