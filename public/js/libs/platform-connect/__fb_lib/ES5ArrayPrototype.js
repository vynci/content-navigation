 define( 'ES5ArrayPrototype', function ( require ) {
                var g = {};
                g.map = function (h, i) {
                    if (typeof h != 'function') throw new TypeError();
                    var j, k = this.length,
                        l = new Array(k);
                    for (j = 0; j < k; ++j)
                        if (j in this) l[j] = h.call(i, this[j], j, this);
                    return l;
                };
                g.forEach = function (h, i) {
                    g.map.call(this, h, i);
                };
                g.filter = function (h, i) {
                    if (typeof h != 'function') throw new TypeError();
                    var j, k, l = this.length,
                        m = [];
                    for (j = 0; j < l; ++j)
                        if (j in this) {
                            k = this[j];
                            if (h.call(i, k, j, this)) m.push(k);
                        }
                    return m;
                };
                g.every = function (h, i) {
                    if (typeof h != 'function') throw new TypeError();
                    var j = new Object(this),
                        k = j.length;
                    for (var l = 0; l < k; l++)
                        if (l in j)
                            if (!h.call(i, j[l], l, j)) return false;
                    return true;
                };
                g.some = function (h, i) {
                    if (typeof h != 'function') throw new TypeError();
                    var j = new Object(this),
                        k = j.length;
                    for (var l = 0; l < k; l++)
                        if (l in j)
                            if (h.call(i, j[l], l, j)) return true;
                    return false;
                };
                g.indexOf = function (h, i) {
                    var j = this.length;
                    i |= 0;
                    if (i < 0) i += j;
                    for (; i < j; i++)
                        if (i in this && this[i] === h) return i;
                    return -1;
                };
                module.exports = g;
            });