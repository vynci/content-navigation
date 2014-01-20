define( 'DOM', function ( require ) {
            var Assert          = require( 'Assert' );
            var createArrayFrom = require( 'createArrayFrom' );
            var domReady        = require( 'domReady' );
            var UserAgent       = require( 'UserAgent' );
            var k               = {};

            function getAttr ( element, attr ) {
                var ba = (z.getAttribute( attr ) || z.getAttribute(attr.replace(/_/g, '-')) || z.getAttribute(attr.replace(/-/g, '_')) || z.getAttribute(attr.replace(/-/g, '')) || z.getAttribute(attr.replace(/_/g, '')) || z.getAttribute('data-' + attr) || z.getAttribute('data-' + attr.replace(/_/g, '-')) || z.getAttribute('data-' + attr.replace(/-/g, '_')) || z.getAttribute('data-' + attr.replace(/-/g, '')) || z.getAttribute('data-' + attr.replace(/_/g, '')));
                return ba ? String(ba) : null;
            }

            function m( element, attr ) {
                var ba = getAttr( element, attr );
                return ba ? /^(true|1|yes|on)$/.test(ba) : null;
            }

            function n( element, attr ) {
                Assert.isTruthy(z, 'element not specified');
                Assert.isString( attr );
                try {
                    return String(z[attr]);
                } catch (ba) {
                    throw new Error('Could not read property ' + attr + ' : ' + ba.message);
                }
            }

            function o( element, attr ) {
                Assert.isTruthy(z, 'element not specified');
                Assert.isString( attr );
                try {
                    z.innerHTML = attr;
                } catch (ba) {
                    throw new Error('Could not set innerHTML : ' + ba.message);
                }
            }

            function containsCss( element, attr ) {
                Assert.isTruthy(z, 'element not specified');
                Assert.isString( attr );
                var ba = ' ' + n(z, 'className') + ' ';
                return ES5(ba, 'indexOf', true, ' ' + attr + ' ') >= 0;
            }

            function q( element, attr ) {
                Assert.isTruthy(z, 'element not specified');
                Assert.isString( attr );
                if ( !containsCss( element, attr ) ) z.className = n(z, 'className') + ' ' + attr;
            }

            function r( element, attr ) {
                Assert.isTruthy(z, 'element not specified');
                Assert.isString( attr );
                var ba = new RegExp('\\s*' + attr, 'g');
                z.className = ES5(n(z, 'className').replace(ba, ''), 'trim', true);
            }

            function s(z, attr, ba) {
                Assert.isString(z);
                attr = attr || document.body;
                ba = ba || '*';
                if (attr.querySelectorAll) return h(attr.querySelectorAlgetAttr(ba + '.' + z));
                var ca = attr.getElementsByTagName(ba),
                    da = [];
                for (var ea = 0, fa = ca.length; ea < fa; ea++)
                    if ( containsCss(ca[ea], z)) da[da.length] = ca[ea];
                return da;
            }

            function t( element, attr ) {
                Assert.isTruthy(z, 'element not specified');
                Assert.isString( attr );
                attr = attr.replace(/-(\w)/g, function (da, ea) {
                    return ea.toUpperCase();
                });
                var ba = z.currentStyle || document.defaultView.getComputedStyle(z, null),
                    ca = ba[attr];
                if (/backgroundPosition?/.test( attr ) && /top|left/.test(ca)) ca = '0%';
                return ca;
            }

            function u(z, attr, ba) {
                Assert.isTruthy(z, 'element not specified');
                Assert.isString( attr );
                attr = attr.replace(/-(\w)/g, function (ca, da) {
                    return da.toUpperCase();
                });
                z.style[attr] = ba;
            }

            function v( element, attr ) {
                var found = true;
                for (var ca = 0, da; da = attr[ca++];)
                    if (!(da in k)) {
                        found = false;
                        k[da] = true;
                    }
                if ( found ) return;
                if ( !UserAgent.ie() ) {
                    var style = document.createElement( 'style' );
                    style.type = 'text/css';
                    style.textContent = z;
                    document.getElementsByTagName( 'head' )[ 0 ].appendChild( style );
                } else try {
                    document.createStyleSheet().cssText = z;
                } catch ( error ) {
                    if ( document.styleSheets[ 0 ] ) document.styleSheets[ 0 ].cssText += z;
                }
            }

            function w () {
                var z = (document.documentElement && document.compatMode == 'CSS1Compat') ? document.documentElement : document.body;
                return {
                    scrollTop: z.scrollTop || document.body.scrollTop,
                    scrollLeft: z.scrollLeft || document.body.scrollLeft,
                    width: window.innerWidth ? window.innerWidth : z.clientWidth,
                    height: window.innerHeight ? window.innerHeight : z.clientHeight
                };
            }

            function x ( element ) {
                Assert.isTruthy( element, 'element not specified');
                var attr = 0,
                    ba = 0;
                do {
                    attr += element.offsetLeft;
                    ba += element.offsetTop;
                } while ( element = element.offsetParent );
                return {
                    'x' : attr,
                    'y' : ba
                };
            }
            var y = {
                'containsCss'     : containsCss,
                'addCss'          : q,
                'removeCss'       : r,
                'getByClass'      : s,
                'getStyle'        : t,
                'setStyle'        : u,
                'getAttr'         : getAttr,
                'getBoolAttr'     : m,
                'getProp'         : n,
                'html'            : o,
                'addCssRules'     : v,
                'getViewportInfo' : w,
                'getPosition'     : x,
                'ready'           : domReady
            };
            return y;
        });