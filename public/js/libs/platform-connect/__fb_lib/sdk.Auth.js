define( 'sdk.Auth', function ( require ) {
            var g = require('sdk.Cookie'),
                h = require('copyProperties'),
                i = require('sdk.createIframe'),
                j = require('DOMWrapper'),
                k = require('sdk.feature'),
                l = require('sdk.getContextType'),
                m = require('guid'),
                n = require('sdk.Impressions'),
                o = require('Log'),
                p = require('ObservableMixin'),
                q = require('QueryString'),
                r = require('sdk.Runtime'),
                s = require('sdk.SignedRequest'),
                t = require('UrlMap'),
                u = require('URL'),
                v = require('sdk.XD'),
                w, x, y = new p();

            function z(fa, ga) {
                var ha = r.getUserID(),
                    ia = '';
                if (fa)
                    if (fa.userID) {
                        ia = fa.userID;
                    } else if (fa.signedRequest) {
                    var ja = s.parse(fa.signedRequest);
                    if (ja && ja.user_id) ia = ja.user_id;
                }
                var ka = r.getLoginStatus(),
                    la = (ka === 'unknown' && fa) || (r.getUseCookie() && r.getCookieUserID() !== ia),
                    ma = ha && !fa,
                    na = fa && ha && ha != ia,
                    oa = fa != w,
                    pa = ga != (ka || 'unknown');
                r.setLoginStatus(ga);
                r.setAccessToken(fa && fa.accessToken || null);
                r.setUserID(ia);
                w = fa;
                var qa = {
                    authResponse: fa,
                    status: ga
                };
                if (ma || na) y.inform('logout', qa);
                if (la || na) y.inform('login', qa);
                if (oa) y.inform('authresponse.change', qa);
                if (pa) y.inform('status.change', qa);
                return qa;
            }

            function aa() {
                return w;
            }

            function ba(fa, gglobal, ha) {
                return function (ia) {
                    var ja;
                    if (ia && ia.access_token) {
                        var ka = s.parse(ia.signed_request);
                        ga = {
                            accessToken: ia.access_token,
                            userID: ka.user_id,
                            expiresIn: parseInt(ia.expires_in, 10),
                            signedRequest: ia.signed_request
                        };
                        if (r.getUseCookie()) {
                            var la = ga.expiresIn === 0 ? 0 : ES5('Date', 'now', false) + ga.expiresIn * 1000,
                                ma = g.getDomain();
                            if (!ma && ia.base_domain) g.setDomain('.' + ia.base_domain);
                            g.setSignedRequestCookie(ia.signed_request, la);
                        }
                        ja = 'connected';
                        z(gglobal, ja);
                    } else if (ha === 'logout' || ha === 'login_status') {
                        if (ia.error && ia.error === 'not_authorized') {
                            ja = 'not_authorized';
                        } else ja = 'unknown';
                        z(null, ja);
                        if (r.getUseCookie()) g.clearSignedRequestCookie();
                    }
                    if (ia && ia.https == 1) r.setSecure(true);
                    if (fa) fa({
                        authResponse: ga,
                        status: r.getLoginStatus()
                    });
                    return ga;
                };
            }

            function ca(fa) {
                var gglobal, ha = ES5('Date', 'now', false);
                if (x) {
                    clearTimeout(x);
                    x = null;
                }
                var ia = ba(fa, w, 'login_status'),
                    ja = u(t.resolve('www', true) + '/connect/ping').setSearch(q.encode({
                        client_id: r.getClientID(),
                        response_type: 'token,signed_request,code',
                        domain: location.hostname,
                        origin: l(),
                        redirect_uri: v.handler(function (ka) {
                            if (k('e2e_ping_tracking', true)) {
                                var la = {
                                    init: ha,
                                    close: ES5('Date', 'now', false),
                                    method: 'ping'
                                };
                                o.debug('e2e: %s', ES5('JSON', 'stringify', false, la));
                                n.log(114, {
                                    payload: la
                                });
                            }
                            ga.parentNode.removeChild(ga);
                            if (ia(ka)) x = setTimeout(function () {
                                ca(function () {});
                            }, 1200000);
                        }, 'parent'),
                        sdk: 'joey',
                        kid_directed_site: r.getKidDirectedSite()
                    }));
                ga = i({
                    root: j.getRoot(),
                    name: m(),
                    url: ja.toString(),
                    style: {
                        display: 'none'
                    }
                });
            }
            var da;

            function ea(fa, ga) {
                if (!r.getClientID()) {
                    o.warn('FB.getLoginStatus() called before calling FB.init().');
                    return;
                }
                if (fa)
                    if (!ga && da == 'loaded') {
                        fa({
                            status: r.getLoginStatus(),
                            authResponse: aa()
                        });
                        return;
                    } else y.subscribe('FB.loginStatus', fa);
                if (!ga && da == 'loading') return;
                da = 'loading';
                var ha = function (ia) {
                    da = 'loaded';
                    y.inform('FB.loginStatus', ia);
                    y.clearSubscribers('FB.loginStatus');
                };
                ca(ha);
            }
            h(y, {
                getLoginStatus: ea,
                fetchLoginStatus: ca,
                setAuthResponse: z,
                getAuthResponse: aa,
                parseSignedRequest: s.parse,
                xdResponseWrapper: ba
            });
            module.exports = y;
        });