define( 'PluginPipe', function ( require ) {
            var g = require('sdk.Content'),
                h = require('copyProperties'),
                i = require('sdk.feature'),
                j = require('guid'),
                k = require('insertIframe'),
                l = require('Miny'),
                m = require('ObservableMixin'),
                n = require('PluginPipeConfig'),
                o = require('sdk.Runtime'),
                p = require('UrlMap'),
                q = require('UserAgent'),
                r = require('XFBML'),
                s = new m(),
                t = n.threshold,
                u = [];

            function v() {
                return !!(i('plugin_pipe') && o.getSecure() !== undefined && (q.chrome() || q.firefox()) && n.enabledApps[o.getClientID()]);
            }

            function w() {
                var y = u;
                u = [];
                if (y.length <= t) {
                    ES5(y, 'forEach', true, function (ba) {
                        k(ba.config);
                    });
                    return;
                }
                var z = y.length + 1;

                function aa() {
                    z--;
                    if (z === 0) x(y);
                }
                ES5(y, 'forEach', true, function (ba) {
                    var ca = {};
                    for (var da in ba.config) ca[da] = ba.config[da];
                    ca.url = p.resolve('www', o.getSecure()) + '/plugins/plugin_pipe_shell.php';
                    ca.onload = aa;
                    k(ca);
                });
                aa();
            }
            r.subscribe('parse', w);

            function x(y) {
                var z = document.createElement('span');
                g.appendHidden(z);
                var aa = {};
                ES5(y, 'forEach', true, function (fa) {
                    aa[fa.config.name] = {
                        plugin: fa.tag,
                        params: fa.params
                    };
                });
                var ba = ES5('JSON', 'stringify', false, aa),
                    ca = l.encode(ba);
                ES5(y, 'forEach', true, function (fa) {
                    var ga = document.getElementsByName(fa.config.name)[0];
                    ga.onload = fa.config.onload;
                });
                var da = p.resolve('www', o.getSecure()) + '/plugins/pipe.php',
                    ea = j();
                k({
                    url: 'about:blank',
                    root: z,
                    name: ea,
                    className: 'fb_hidden fb_invisible',
                    onload: function () {
                        g.submitToTarget({
                            url: da,
                            target: ea,
                            params: {
                                plugins: ca.length < ba.length ? ca : ba
                            }
                        });
                    }
                });
            }
            h(s, {
                add: function (y) {
                    var z = v();
                    z && u.push({
                        config: y._config,
                        tag: y._tag,
                        params: y._params
                    });
                    return z;
                }
            });
            module.exports = s;
        });