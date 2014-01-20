define( 'XDM', function ( require ) {
            var g = require('DOMEventListener'),
                h = require('DOMWrapper'),
                i = require('emptyFunction'),
                j = require('Flash'),
                k = require('GlobalCallback'),
                l = require('guid'),
                m = require('Log'),
                n = require('UserAgent'),
                o = require('wrapFunction'),
                p = {}, q = {
                    transports: []
                }, r = h.getWindow();

            function s(u) {
                var v = {}, w = u.length,
                    x = q.transports;
                while (w--) v[u[w]] = 1;
                w = x.length;
                while (w--) {
                    var y = x[w],
                        z = p[y];
                    if (!v[y] && z.isAvailable()) return y;
                }
            }
            var t = {
                register: function (u, v) {
                    m.debug('Registering %s as XDM provider', u);
                    q.transports.push(u);
                    p[u] = v;
                },
                create: function (u) {
                    if (!u.whenReady && !u.onMessage) {
                        m.error('An instance without whenReady or onMessage makes no sense');
                        throw new Error('An instance without whenReady or ' + 'onMessage makes no sense');
                    }
                    if (!u.channel) {
                        m.warn('Missing channel name, selecting at random');
                        u.channel = l();
                    }
                    if (!u.whenReady) u.whenReady = i;
                    if (!u.onMessage) u.onMessage = i;
                    var v = u.transport || s(u.blacklist || []),
                        w = p[v];
                    if (w && w.isAvailable()) {
                        m.debug('%s is available', v);
                        w.init(u);
                        return v;
                    }
                }
            };
            t.register('fragment', (function () {
                var u = false,
                    v, w = location.protocol + '//' + location.host;

                function x(y) {
                    var z = document.createElement('iframe');
                    z.src = 'javascript:false';
                    var aa = g.add(z, 'load', function () {
                        aa.remove();
                        setTimeout(function () {
                            z.parentNode.removeChild(z);
                        }, 5000);
                    });
                    v.appendChild(z);
                    z.src = y;
                }
                return {
                    isAvailable: function () {
                        return true;
                    },
                    init: function (y) {
                        m.debug('init fragment');
                        var z = {
                            send: function (aglobal, bglobal, cglobal, da) {
                                m.debug('sending to: %s (%s)', ba + y.channelPath, da);
                                x(ba + y.channelPath + aa + '&xd_rel=parent.parent&relation=parent.parent&xd_origin=' + encodeURIComponent(w));
                            }
                        };
                        if (u) {
                            setTimeout(function () {
                                y.whenReady(z);
                            }, 0);
                            return;
                        }
                        v = y.root;
                        u = true;
                        setTimeout(function () {
                            y.whenReady(z);
                        }, 0);
                    }
                };
            })());
            t.register('flash', (function () {
                var u = false,
                    v, w = false,
                    x = 15000,
                    y;
                return {
                    isAvailable: function () {
                        return j.checkMinVersion('8.0.24');
                    },
                    init: function (z) {
                        m.debug('init flash: ' + z.channel);
                        var aa = {
                            send: function (dglobal, eglobal, fglobal, ga) {
                                m.debug('sending to: %s (%s)', eglobal, ga);
                                v.postMessage(dglobal, eglobal, ga);
                            }
                        };
                        if (u) {
                            z.whenReady(aa);
                            return;
                        }
                        var ba = z.root.appendChild(r.document.createElement('div')),
                            ca = k.create(function () {
                                k.remove(ca);
                                clearTimeout(y);
                                m.info('xdm.swf called the callback');
                                var da = k.create(function (eglobal, fa) {
                                    ea = decodeURIComponent(ea);
                                    fa = decodeURIComponent(fa);
                                    m.debug('received message %s from %s', eglobal, fa);
                                    z.onMessage(eglobal, fa);
                                }, 'xdm.swf:onMessage');
                                v.init(z.channel, da);
                                z.whenReady(aa);
                            }, 'xdm.swf:load');
                        v = j.embed(z.flashUrl, bglobal, null, {
                            protocol: location.protocol.replace(':', ''),
                            host: location.host,
                            callback: ca,
                            log: w
                        });
                        y = setTimeout(function () {
                            m.warn('The Flash component did not load within %s ms - ' + 'verify that the container is not set to hidden or invisible ' + 'using CSS as this will cause some browsers to not load ' + 'the components', x);
                        }, x);
                        u = true;
                    }
                };
            })());
            t.register('postmessage', (function () {
                var u = false;
                return {
                    isAvailable: function () {
                        return !!r.postMessage;
                    },
                    init: function (v) {
                        m.debug('init postMessage: ' + v.channel);
                        var w = '_FB_' + v.channel,
                            x = {
                                send: function (y, z, aglobal, ba) {
                                    if (r === aa) {
                                        m.error('Invalid windowref, equal to window (self)');
                                        throw new Error();
                                    }
                                    m.debug('sending to: %s (%s)', z, ba);
                                    var ca = function () {
                                        aa.postMessage('_FB_' + ba + y, z);
                                    };
                                    if (n.ie() == 8) {
                                        setTimeout(cglobal, 0);
                                    } else ca();
                                }
                            };
                        if (u) {
                            v.whenReady(x);
                            return;
                        }
                        g.add(r, 'message', o(function (event) {
                            var y = event.data,
                                z = event.origin || 'native';
                            if (typeof y != 'string') {
                                m.warn('Received message of type %s from %s, expected a string', typeof y, z);
                                return;
                            }
                            m.debug('received message %s from %s', y, z);
                            if (y.substring(0, w.length) == w) y = y.substring(w.length);
                            v.onMessage(y, z);
                        }, 'entry', 'onMessage'));
                        v.whenReady(x);
                        u = true;
                    }
                };
            })());
            module.exports = t;
        });