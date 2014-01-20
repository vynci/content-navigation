define( 'ES5FunctionPrototype', function ( require ) {
                var g = {};
                g.bind = function (h) {
                    if (typeof this != 'function') throw new TypeError('Bind must be called on a function');
                    var i = this,
                        j = Array.prototype.slice.call(arguments, 1);

                    function k() {
                        return i.apply(h, j.concat(Array.prototype.slice.call(arguments)));
                    }
                    k.displayName = 'bound:' + (i.displayName || i.name || '(?)');
                    k.toString = function l() {
                        return 'bound: ' + i;
                    };
                    return k;
                };
                module.exports = g;
            });