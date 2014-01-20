define( 'sprintf', function ( require ) {
            function g(h) {
                var i = Array.prototype.slice.call(arguments, 1),
                    j = 0;
                return h.replace(/%s/g, function (k) {
                    return i[j++];
                });
            }
            module.exports = g;
        });