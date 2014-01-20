define( 'GlobalCallback', function ( require ) {
            var g = require('DOMWrapper'),
                h = require('dotAccess'),
                i = require('guid'),
                j = require('wrapFunction'),
                k, l, m = {
                    setPrefix: function (n) {
                        k = h(g.getWindow(), n, true);
                        l = n;
                    },
                    create: function (n, o) {
                        if (!k) this.setPrefix('__globalCallbacks');
                        var p = i();
                        k[p] = j(n, 'entry', o || 'GlobalCallback');
                        return l + '.' + p;
                    },
                    remove: function (n) {
                        var o = n.substring(l.length + 1);
                        delete k[o];
                    }
                };
            module.exports = m;
        });