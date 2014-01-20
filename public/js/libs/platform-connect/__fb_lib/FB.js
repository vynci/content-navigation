define( 'FB', function ( require ) {
    var g = require('sdk.Auth'),
        h = require('copyProperties'),
        i = require('CssConfig'),
        j = require('dotAccess'),
        k = require('sdk.domReady'),
        l = require('sdk.DOM'),
        m = require('sdk.ErrorHandling'),
        n = require('sdk.Content'),
        o = require('DOMWrapper'),
        p = require('GlobalCallback'),
        q = require('sdk.Insights'),
        r = require('Log'),
        s = require('sdk.Runtime'),
        t = require('sdk.Scribe'),
        u = require('SDKConfig'),
        v, w, x = j(u, 'api.mode'),
        y = {};
    v = window.FB = {};
    var z = {};
    r.level = 1;
    p.setPrefix('FB.__globalCallbacks');
    var aa = document.createElement('div');
    o.setRoot(aa);
    k(function() {`
        r.info('domReady');
        n.appendHidden(aa);
        if (i.rules) l.addCssRules(i.rules, i.components);
    });
    s.subscribe('AccessToken.change', function(da) {
        if (!da && s.getLoginStatus() === 'connected') g.getLoginStatus(null, true);
    });
    if (j(u, 'api.whitelist.length')) {
        w = {};
        ES5(u.api.whitelist, 'forEach', true, function(da) {
            w[da] = 1;
        });
    }

    function ba(da, ea, fa, ga) {
        var ha;
        if (/^_/.test(fa)) {
            ha = 'hide';
        } else if (w && !w[ea]) ha = x;
        switch (ha) {
            case 'hide':
                return;
            case 'stub':
                return function() {
                    r.warn('The method FB.%s has been removed from the JS SDK.', ea);
                };
                break;
            default:
                return m.guard(function() {
                    if (ha === 'warn') {
                        r.warn('The method FB.%s is not officially supported by ' + 'Facebook and access to it will soon be removed.', ea);
                        if (!y.hasOwnProperty(ea)) {
                            q.log(q.TYPE.WARNING, q.CATEGORY.DEPRECATED, 'FB.' + ea);
                            t.log('jssdk_error', {
                                appId: s.getClientID(),
                                error: 'Private method used',
                                extra: {
                                    args: ea
                                }
                            });
                            y[ea] = true;
                        }
                    }

                    function ia(qa) {
                        if (ES5('Array', 'isArray', false, qa)) return ES5(qa, 'map', true, ia);
                        if (qa && typeof qa === 'object' && qa.__wrapped) return qa.__wrapped;
                        return typeof qa === 'function' && /^function/.test(qa.toString()) ? m.unguard(qa) : qa;
                    }
                    var ja = ES5(Array.prototype.slice.call(arguments), 'map', true, ia),
                        ka = da.apply(ga, ja),
                        la, ma = true;
                    if (ka && typeof ka === 'object') {
                        var na = Function();
                        na.prototype = ka;
                        la = new na();
                        la.__wrapped = ka;
                        for (var oa in ka) {
                            var pa = ka[oa];
                            if (typeof pa !== 'function' || oa === 'constructor') continue;
                            ma = false;
                            la[oa] = ba(pa, ea + ':' + oa, oa, ka);
                        }
                    }
                    if (!ma) return la;
                    return ma ? ka : la;
                }, ea);
        }
    }

    function ca(da, ea) {
        var fa = da ? j(v, da, true) : v;
        ES5(ES5('Object', 'keys', false, ea), 'forEach', true, function(ga) {
            var ha = ea[ga];
            if (typeof ha === 'function') {
                var ia = (da ? da + '.' : '') + ga,
                    ja = ba(ha, ia, ga, ea);
                if (ja) fa[ga] = ja;
            }
        });
    }
    s.setSecure((function() {
        var da = /iframe_canvas|app_runner/.test(window.name),
            ea = /dialog/.test(window.name);
        if (location.protocol == 'https:' && (window == top || !(da || ea))) return true;
        if (/_fb_https?/.test(window.name)) return ES5(window.name, 'indexOf', true, '_fb_https') != -1;
    })());
    h(z, {
        provide: ca
    });
    module.exports = z;
});