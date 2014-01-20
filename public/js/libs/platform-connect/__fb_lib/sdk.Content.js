define("sdk.Content", ["sdk.domReady", "Log", "UserAgent"], function (a, require, requireDynamic, requireLazy, module, f) {
            var g = require('sdk.domReady'),
                h = require('Log'),
                i = require('UserAgent'),
                j, k, l = {
                    append: function (m, n) {
                        if (!n)
                            if (!j) {
                                j = n = document.getElementById('fb-root');
                                if (!n) {
                                    h.warn('The "fb-root" div has not been created, auto-creating');
                                    j = n = document.createElement('div');
                                    n.id = 'fb-root';
                                    if (i.ie() || !document.body) {
                                        g(function () {
                                            document.body.appendChild(n);
                                        });
                                    } else document.body.appendChild(n);
                                }
                                n.className += ' fb_reset';
                            } else n = j;
                        if (typeof m == 'string') {
                            var o = document.createElement('div');
                            n.appendChild(o).innerHTML = m;
                            return o;
                        } else return n.appendChild(m);
                    },
                    appendHidden: function (m) {
                        if (!n) {
                            var n = document.createElement('div'),
                                o = n.style;
                            o.position = 'absolute';
                            o.top = '-10000px';
                            o.width = o.height = 0;
                            n = l.append(n);
                        }
                        return l.append(m, n);
                    },
                    submitToTarget: function (m, n) {
                        var o = document.createElement('form');
                        o.action = m.url;
                        o.target = m.target;
                        o.method = (n) ? 'GET' : 'POST';
                        l.appendHidden(o);
                        for (var p in m.params)
                            if (m.params.hasOwnProperty(p)) {
                                var q = m.params[p];
                                if (q !== null && q !== undefined) {
                                    var r = document.createElement('input');
                                    r.name = p;
                                    r.value = q;
                                    o.appendChild(r);
                                }
                            }
                        o.submit();
                        o.parentNode.removeChild(o);
                    }
                };
            module.exports = l;
        });