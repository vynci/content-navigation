define( 'sdk.Cookie', function ( require ) {
            var g = require('QueryString'),
                h = require('sdk.Runtime'),
                i = null;

            function j(m, n, o) {
                m = m + h.getClientID();
                var p = i && i !== '.';
                if (p) {
                    document.cookie = m + '=;  expires=Wed, 04 Feb 2004 08:00:00 GMT; ';
                    document.cookie = m + '=;  expires=Wed, 04 Feb 2004 08:00:00 GMT; ' + 'domain=' + location.hostname + '; ';
                }
                var q = new Date(o).toGMTString();
                document.cookie = m + '=' + n + (n && o === 0 ? '' : ';  expires=' + q) + ';  path=/' + (p ? ';  domain=' + i : '');
            }

            function k(m) {
                m = m + h.getClientID();
                var n = new RegExp('\\b' + m + '=([^; ]*)\\b');
                return n.test(document.cookie) ? RegExp.$1 : null;
            }
            var l = {
                setDomain: function (m) {
                    i = m;
                    var n = g.encode({
                        base_domain: i && i !== '.' ? i : ''
                    }),
                        o = new Date();
                    o.setFullYear(o.getFullYear() + 1);
                    j('fbm_', n, o.getTime());
                },
                getDomain: function () {
                    return i;
                },
                loadMeta: function () {
                    var m = k('fbm_');
                    if (m) {
                        var n = g.decode(m);
                        if (!i) i = n.base_domain;
                        return n;
                    }
                },
                loadSignedRequest: function () {
                    return k('fbsr_');
                },
                setSignedRequestCookie: function (m, n) {
                    if (!m) throw new Error('Value passed to Cookie.setSignedRequestCookie ' + 'was empty.');
                    j('fbsr_', m, n);
                },
                clearSignedRequestCookie: function () {
                    j('fbsr_', '', 0);
                },
                setRaw: j
            };
            module.exports = l;
        });