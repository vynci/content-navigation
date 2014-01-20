define( 'sdk.domReady', function ( require ) {
            var g, h = "readyState" in document ? /loaded|complete/.test(document.readyState) : !! document.body;

            function i() {
                if (!g) return;
                var l;
                while (l = g.shift()) l();
                g = null;
            }

            function j(l) {
                if (g) {
                    g.push(l);
                    return;
                } else l();
            }
            if (!h) {
                g = [];
                if (document.addEventListener) {
                    document.addEventListener('DOMContentLoaded', i, false);
                    window.addEventListener('load', i, false);
                } else if (document.attachEvent) {
                    document.attachEvent('onreadystatechange', i);
                    window.attachEvent('onload', i);
                }
                if (document.documentElement.doScroll && window == window.top) {
                    var k = function () {
                        try {
                            document.documentElement.doScroll('left');
                        } catch (l) {
                            setTimeout(k, 0);
                            return;
                        }
                        i();
                    };
                    k();
                }
            }
            module.exports = j;
        }, 3);