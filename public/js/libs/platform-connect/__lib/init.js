define( 'init', function ( require ) {
            var h = require('lodash').extend,
                i = require('createArrayFrom'),
                l = require('Log'),
                m = require('QueryString'),
                n = require('Runtime');
    var ES5 = require( 'ES5' );

            // function o(q) {
            //     var r = (typeof q == 'number' && q > 0) || (typeof q == 'string' && /^[0-9a-f]{21,}$|^[0-9]{1,21}$/.test(q));
            //     if (r) return q.toString();
            //     l.warn('Invalid App Id: Must be a number or numeric string representing ' + 'the application id.');
            //     return null;
            // }

            function p(q) {
                if (n.getInitialized()) l.warn('FB.init has already been called - this could indicate a problem');
                if (/number|string/.test(typeof q)) {
                    l.warn('FB.init called with invalid parameters');
                    q = {
                        apiKey: q
                    };
                }
                q = h({
                    'logging' : true,
                    'status'  : true
                }, q || {} );
                var r = 'asdf'; //o(q.appId || q.apiKey);
                if (r !== null) n.setClientID(r);
                if ('scope' in q) n.setScope(q.scope);
                if (q.cookie) {
                    n.setUseCookie(true);
                    // if (typeof q.cookie === 'string') g.setDomain(q.cookie);
                }
                // if (q.kidDirectedSite) n.setKidDirectedSite(true);
                n.setInitialized(true);
                // k.fire('init:post', q);
            }

            setTimeout(function () {
                var q = /(connect\.facebook\.net|\.facebook\.com\/assets.php).*?#(.*)/;
                ES5(i(document.getElementsByTagName('script')), 'forEach', true, function (r) {
                    if (r.src) {
                        var s = q.exec(r.src);
                        if (s) {
                            var t = m.decode(s[2]);
                            for (var u in t)
                                if (t.hasOwnProperty(u)) {
                                    var v = t[u];
                                    if (v == '0') t[u] = 0;
                                }
                            p(t);
                        }
                    }
                });
                if (window.pcAsyncInit && !window.pcAsyncInit.hasRun) {
                    window.pcAsyncInit.hasRun = true;
                }
            }, 0);
            return p;
        });