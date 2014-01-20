define( 'Assert', function ( require ) {
            var g = require('AssertionError'),
                h = require('sprintf');

            function i(n, o) {
                if (typeof n !== 'boolean' || !n) throw new g(o);
                return n;
            }

            function j(n, o, p) {
                var q;
                if (o === undefined) {
                    q = 'undefined';
                } else if (o === null) {
                    q = 'null';
                } else {
                    var r = Object.prototype.toString.call(o);
                    q = /\s(\w*)/.exec(r)[1].toLowerCase();
                }
                i(ES5(n, 'indexOf', true, q) !== -1, p || h('Expression is of type %s, not %s', q, n));
                return o;
            }

            function k(n, o, p) {
                i(o instanceof n, p || 'Expression not instance of type');
                return o;
            }

            function l(n, o) {
                m['is' + n] = o;
                m['maybe' + n] = function (p, q) {
                    if (p != null) o(p, q);
                };
            }
            var m = {
                isInstanceOf: k,
                isTrue: i,
                isTruthy: function (n, o) {
                    return i( !! n, o);
                },
                type: j,
                define: function (n, o) {
                    n = n.substring(0, 1).toUpperCase() + n.substring(1).toLowerCase();
                    l(n, function (p, q) {
                        i(o(p), q);
                    });
                }
            };
            ES5(['Array', 'Boolean', 'Date', 'Function', 'Null', 'Number', 'Object', 'Regexp', 'String', 'Undefined'], 'forEach', true, function (n) {
                l(n, ES5(j, 'bind', true, null, n.toLowerCase()));
            });
            module.exports = m;
        });