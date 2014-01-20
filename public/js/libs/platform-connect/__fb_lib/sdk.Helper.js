define( 'sdk.Helper', function ( require ) {
            var g = require('sdk.ErrorHandling'),
                h = require('sdk.Event'),
                i = require('safeEval'),
                j = require('UrlMap'),
                k = {
                    isUser: function (l) {
                        return l < 2.2e+09 || (l >= 1e+14 && l <= 100099999989999) || (l >= 8.9e+13 && l <= 89999999999999);
                    },
                    upperCaseFirstChar: function (l) {
                        if (l.length > 0) {
                            return l.substr(0, 1).toUpperCase() + l.substr(1);
                        } else return l;
                    },
                    getProfileLink: function (l, m, n) {
                        n = n || (l ? j.resolve('www') + '/profile.php?id=' + l.uid : null);
                        if (n) m = '<a class="fb_link" href="' + n + '">' + m + '</a>';
                        return m;
                    },
                    invokeHandler: function (l, m, n) {
                        if (l)
                            if (typeof l === 'string') {
                                g.unguard(i)(l, n);
                            } else if (l.apply) g.unguard(l).apply(m, n || []);
                    },
                    fireEvent: function (l, m) {
                        var n = m._attr.href;
                        m.fire(l, n);
                        h.fire(l, n, m);
                    },
                    executeFunctionByName: function (l) {
                        var m = Array.prototype.slice.call(arguments, 1),
                            n = l.split("."),
                            o = n.pop(),
                            p = window;
                        for (var q = 0; q < n.length; q++) p = p[n[q]];
                        return p[o].apply(this, m);
                    }
                };
            module.exports = k;
        });