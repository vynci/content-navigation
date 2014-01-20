define('Type', function(require) {
    var g = require('copyProperties'),
        h = require('Assert');

    function i() {
        var m = this.__mixins;
        if (m)
            for (var n = 0; n < m.length; n++) m[n].apply(this, arguments);
    }

    function j(m, n) {
        if (n instanceof m) return true;
        if (n instanceof i)
            for (var o = 0; o < n.__mixins.length; o++)
                if (n.__mixins[o] == m) return true;
        return false;
    }

    function k(m, n) {
        var o = m.prototype;
        if (!ES5('Array', 'isArray', false, n)) n = [n];
        for (var p = 0; p < n.length; p++) {
            var q = n[p];
            if (typeof q == 'function') {
                o.__mixins.push(q);
                q = q.prototype;
            }
            ES5(ES5('Object', 'keys', false, q), 'forEach', true, function(r) {
                o[r] = q[r];
            });
        }
    }

    function l(m, n, o) {
        var p = n && n.hasOwnProperty('constructor') ? n.constructor : function() {
                this.parent.apply(this, arguments);
            };
        h.isFunction(p);
        if (m && m.prototype instanceof i === false) throw new Error('parent type does not inherit from Type');
        m = m || i;
        var q = new Function();
        q.prototype = m.prototype;
        p.prototype = new q();
        g(p.prototype, n);
        p.prototype.constructor = p;
        p.parent = m;
        p.prototype.__mixins = m.prototype.__mixins ? Array.prototype.slice.call(m.prototype.__mixins) : [];
        if (o) k(p, o);
        p.prototype.parent = function() {
            this.parent = m.prototype.parent;
            m.apply(this, arguments);
        };
        p.prototype.parentCall = function(r) {
            return m.prototype[r].apply(this, Array.prototype.slice.call(arguments, 1));
        };
        p.extend = function(r, s) {
            return l(this, r, s);
        };
        return p;
    }
    g(i.prototype, {
        instanceOf: function(m) {
            return j(m, this);
        }
    });
    g(i, {
        extend: function(m, n) {
            return typeof m === 'function' ? l.apply(null, arguments) : l(null, m, n);
        },
        instanceOf: j
    });
    module.exports = i;
});