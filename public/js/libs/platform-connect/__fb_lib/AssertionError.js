define( 'AssertionError', function ( require ) {
            var g = require('ManagedError');

            function h(i) {
                g.prototype.constructor.apply(this, arguments);
            }
            h.prototype = new g();
            h.prototype.constructor = h;
            module.exports = h;
        });