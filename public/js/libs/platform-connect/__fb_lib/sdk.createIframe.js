define( 'sdk.createIframe', function ( require ) {
            var g = require('copyProperties'),
                h = require('guid'),
                i = require('hasNamePropertyBug'),
                j = require('DOMEventListener');

            function k(l) {
                l = g({}, l);
                var m, n = l.name || h(),
                    o = l.root,
                    p = l.style || {
                        border: 'none'
                    }, q = l.url,
                    r = l.onload;
                if (i()) {
                    m = document.createElement('<iframe name="' + n + '"/>');
                } else {
                    m = document.createElement("iframe");
                    m.name = n;
                }
                delete l.style;
                delete l.name;
                delete l.url;
                delete l.root;
                delete l.onload;
                var s = g({
                    frameBorder: 0,
                    allowTransparency: true,
                    scrolling: 'no'
                }, l);
                if (s.width) m.width = s.width + 'px';
                if (s.height) m.height = s.height + 'px';
                delete s.height;
                delete s.width;
                for (var t in s)
                    if (s.hasOwnProperty(t)) m.setAttribute(t, s[t]);
                g(m.style, p);
                m.src = "javascript:false";
                o.appendChild(m);
                if (r) var u = j.add(m, 'load', function () {
                    u.remove();
                    r();
                });
                m.src = q;
                return m;
            }
            module.exports = k;
        });