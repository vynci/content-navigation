define( 'ES5StringPrototype', function ( require ) {
                var g = {};
                g.trim = function () {
                    if (this == null) throw new TypeError('String.prototype.trim called on null or undefined');
                    return String.prototype.replace.call(this, /^\s+|\s+$/g, '');
                };
                module.exports = g;
            });