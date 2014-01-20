define( 'sdk.XD', function ( require ) {
            var g = require('sdk.Content'),
                h = require('createIframe'),
                i = require('EventEmitter'),
                j = require('guid'),
                k = require('Log'),
                l = require('QueryString'),
                m = require('Queue'),
                n = require('resolveURI'),
                o = require('resolveWindow'),
                p = require('sdk.RPC'),
                q = require('Runtime'),
                r = require('UrlMap'),
                s = require('URL'),
                t = require('wrapFunction'),
                u = require('XDConfig'),
                v = require('XDM'),
                w = new m(),
                x = new m(),
                y = new m(),
                z, aglobal, ba = j(),
                ca = j(),
                da = location.protocol + '//' + location.host,
                eglobal, fa = false,
                ga = 'Facebook Cross Domain Communication Frame',
                ha = {}, ia = new m();
            p.setInQueue(ia);

            function ja(pa) {
                k.info('Remote XD can talk to facebook.com (%s)', pa);
                q.setEnvironment(pa === 'canvas' ? q.ENVIRONMENTS.CANVAS : q.ENVIRONMENTS.PAGETAB);
            }

            function ka(pa, qa) {
                if (!qa) {
                    k.error('No senderOrigin');
                    throw new Error();
                }
                var ra = /^https?/.exec(qa)[0];
                switch (pa.xd_action) {
                case 'proxy_ready':
                    var sglobal, ta;
                    if (ra == 'https') {
                        sa = y;
                        ta = aa;
                    } else {
                        sa = x;
                        ta = z;
                    } if (pa.registered) {
                        ja(pa.registered);
                        w = sa.merge(w);
                    }
                    k.info('Proxy ready, starting queue %s containing %s messages', ra + 'ProxyQueue', sa.getLength());
                    sa.start(function (va) {
                        ea.send(typeof va === 'string' ? va : l.encode(va), qglobal, ta.contentWindow, ca + '_' + ra);
                    });
                    break;
                case 'plugin_ready':
                    k.info('Plugin %s ready, protocol: %s', pa.name, ra);
                    ha[pa.name] = {
                        protocol: ra
                    };
                    if (m.exists(pa.name)) {
                        var ua = m.get(pa.name);
                        k.debug('Enqueuing %s messages for %s in %s', ua.getLength(), pa.name, ra + 'ProxyQueue');
                        (ra == 'https' ? y : x).merge(ua);
                    }
                    break;
                }
                if (pa.data) la(pa.data, qa);
            }

            function la(pa, qa) {
                if (qa && qa !== 'native' && !s(qa).isFacebookURL()) return;
                if (typeof pa == 'string') {
                    if (/^FB_RPC:/.test(pa)) {
                        ia.enqueue(pa.substring(7));
                        return;
                    }
                    if (pa.substring(0, 1) == '{') {
                        try {
                            pa = ES5('JSON', 'parse', false, pa);
                        } catch (ra) {
                            k.warn('Failed to decode %s as JSON', pa);
                            return;
                        }
                    } else pa = l.decode(pa);
                }
                if (!qa)
                    if (pa.xd_sig == ba) qa = pa.xd_origin;
                if (pa.xd_action) {
                    ka(pa, qa);
                    return;
                }
                if (pa.access_token) q.setSecure(/^https/.test(da));
                if (pa.cb) {
                    var sa = oa._callbacks[pa.cb];
                    if (!oa._forever[pa.cb]) delete oa._callbacks[pa.cb];
                    if (sa) sa(pa);
                }
            }

            function ma(pa, qa) {
                if (pa == 'facebook') {
                    qa.relation = 'parent.parent';
                    w.enqueue(qa);
                } else {
                    qa.relation = 'parent.frames["' + pa + '"]';
                    var ra = ha[pa];
                    if (ra) {
                        k.debug('Enqueuing message for plugin %s in %s', pa, ra.protocol + 'ProxyQueue');
                        (ra.protocol == 'https' ? y : x).enqueue(qa);
                    } else {
                        k.debug('Buffering message for plugin %s', pa);
                        m.get(pa).enqueue(qa);
                    }
                }
            }
            p.getOutQueue().start(function (pa) {
                ma('facebook', 'FB_RPC:' + pa);
            });

            function na(pa, qa) {
                if (fa) return;
                var ra = pa ? /\/\/.*?(\/[^#]*)/.exec(pa)[1] : location.pathname + location.search;
                ra += (~ES5(ra, 'indexOf', true, '?') ? '&' : '?') + 'fb_xd_fragment#xd_sig=' + ba + '&';
                var sa = g.appendHidden(document.createElement('div')),
                    ta = v.create({
                        root: sa,
                        channel: ca,
                        channelPath: '/' + u.XdUrl + '#',
                        flashUrl: u.Flash.path,
                        whenReady: function (ua) {
                            ea = ua;
                            var va = {
                                channel: ca,
                                origin: location.protocol + '//' + location.host,
                                channel_path: ra,
                                transport: ta,
                                xd_name: qa
                            }, wa = '/' + u.XdUrl + '#' + l.encode(va),
                                xa = u.useCdn ? r.resolve('cdn', false) : 'http://www.facebook.com',
                                ya = u.useCdn ? r.resolve('cdn', true) : 'https://www.facebook.com';
                            if (q.getSecure() !== true) z = h({
                                url: xa + wa,
                                name: 'fb_xdm_frame_http',
                                id: 'fb_xdm_frame_http',
                                root: sa,
                                'aria-hidden': true,
                                title: ga,
                                'tab-index': -1
                            });
                            aa = h({
                                url: ya + wa,
                                name: 'fb_xdm_frame_https',
                                id: 'fb_xdm_frame_https',
                                root: sa,
                                'aria-hidden': true,
                                title: ga,
                                'tab-index': -1
                            });
                        },
                        onMessage: la
                    });
                if (ta === 'fragment') window.FB_XD_onMessage = t(lglobal, 'entry', 'XD:fragment');
                fa = true;
            }
            var oa = {
                rpc: p,
                _callbacks: {},
                _forever: {},
                _channel: ca,
                _origin: da,
                onMessage: la,
                recv: la,
                init: na,
                sendToFacebook: ma,
                inform: function (pa, qglobal, ra, sa) {
                    ma('facebook', {
                        method: pa,
                        params: ES5('JSON', 'stringify', false, qa || {}),
                        behavior: sa || 'p',
                        relation: ra
                    });
                },
                handler: function (pa, qa, ra, sa) {
                    var ta = u.useCdn ? r.resolve('cdn', location.protocol == 'https:') : location.protocol + '//www.facebook.com';
                    return ta + '/' + u.XdUrl + '#' + l.encode({
                        cb: this.registerCallback(pa, ra, sa),
                        origin: da + '/' + ca,
                        domain: location.hostname,
                        relation: qa || 'opener'
                    });
                },
                registerCallback: function (pa, qa, ra) {
                    ra = ra || j();
                    if (qa) oa._forever[ra] = true;
                    oa._callbacks[ra] = pa;
                    return ra;
                }
            };
            (function () {
                var pa = location.href.match(/[?&]fb_xd_fragment#(.*)$/);
                if (pa) {
                    document.documentElement.style.display = 'none';
                    var qa = l.decode(pa[1]),
                        ra = o(qa.xd_rel);
                    k.debug('Passing fragment based message: %s', pa[1]);
                    ra.FB_XD_onMessage(qa);
                    document.open();
                    document.close();
                }
            })();
            i.subscribe('init:post', function (pa) {
                na(pa.channelUrl ? n(pa.channelUrl) : null, pa.xdProxyName);
            });
            module.exports = oa;
        });