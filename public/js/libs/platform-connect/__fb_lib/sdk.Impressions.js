define( 'sdk.Impressions', function ( require ) {
            var g = require('guid'),
                h = require('QueryString'),
                i = require('sdk.Runtime'),
                j = require('UrlMap');

            function k(m) {
                var n = i.getClientID();
                if (!m.api_key && n) m.api_key = n;
                m.kid_directed_site = i.getKidDirectedSite();
                var o = new Image();
                o.src = h.appendToUrl(j.resolve('www', true) + '/impression.php/' + g() + '/', m);
            }
            var l = {
                log: function (m, n) {
                    if (!n.source) n.source = 'jssdk';
                    k({
                        lid: m,
                        payload: ES5('JSON', 'stringify', false, n)
                    });
                },
                impression: k
            };
            module.exports = l;
        });