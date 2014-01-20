define( 'ES5Object', function ( require ) {
                var g = {};
                g.create = function (h) {
                    var i = typeof h;
                    if (i != 'object' && i != 'function') throw new TypeError('Object prototype may only be a Object or null');
                    var j = new Function();
                    j.prototype = h;
                    return new j();
                };
                g.keys = function (h) {
                    var i = typeof h;
                    if (i != 'object' && i != 'function' || h === null) throw new TypeError('Object.keys called on non-object');
                    var j = [];
                    for (var k in h)
                        if (Object.prototype.hasOwnProperty.call(h, k)) j.push(k);
                    var l = !({
                        toString: true
                    }).propertyIsEnumerable('toString'),
                        m = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'prototypeIsEnumerable', 'constructor'];
                    if (l)
                        for (var n = 0; n < m.length; n++) {
                            var o = m[n];
                            if (Object.prototype.hasOwnProperty.call(h, o)) j.push(o);
                        }
                    return j;
                };
                module.exports = g;
            });