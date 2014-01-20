define( 'Base64', function ( require ) {
            var g = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

            function h(l) {
                l = (l.charCodeAt(0) << 16) | (l.charCodeAt(1) << 8) | l.charCodeAt(2);
                return String.fromCharCode(g.charCodeAt(l >>> 18), g.charCodeAt((l >>> 12) & 63), g.charCodeAt((l >>> 6) & 63), g.charCodeAt(l & 63));
            }
            var i = '>___?456789:; <=_______' + '\0\1\2\3\4\5\6\7\b\t\n\13\f\r\16\17\20\21\22\23\24\25\26\27\30\31' + '______\32\33\34\35\36\37 !"#$%&\'()*+,-./0123';

            function j(l) {
                l = (i.charCodeAt(l.charCodeAt(0) - 43) << 18) | (i.charCodeAt(l.charCodeAt(1) - 43) << 12) | (i.charCodeAt(l.charCodeAt(2) - 43) << 6) | i.charCodeAt(l.charCodeAt(3) - 43);
                return String.fromCharCode(l >>> 16, (l >>> 8) & 255, l & 255);
            }
            var k = {
                encode: function (l) {
                    l = unescape(encodeURI(l));
                    var m = (l.length + 2) % 3;
                    l = (l + '\0\0'.slice(m)).replace(/[\s\S]{3}/g, h);
                    return l.slice(0, l.length + m - 2) + '=='.slice(m);
                },
                decode: function (l) {
                    l = l.replace(/[^A-Za-z0-9+\/]/g, '');
                    var m = (l.length + 3) & 3;
                    l = (l + 'AAA'.slice(m)).replace(/..../g, j);
                    l = l.slice(0, l.length + m - 3);
                    try {
                        return decodeURIComponent(escape(l));
                    } catch (n) {
                        throw new Error('Not valid UTF-8');
                    }
                },
                encodeObject: function (l) {
                    return k.encode(ES5('JSON', 'stringify', false, l));
                },
                decodeObject: function (l) {
                    return ES5('JSON', 'parse', false, k.decode(l));
                },
                encodeNums: function (l) {
                    return String.fromCharCode.apply(String, ES5(l, 'map', true, function (m) {
                        return g.charCodeAt((m | -(m > 63)) & -(m > 0) & 63);
                    }));
                }
            };
            return k;
        });