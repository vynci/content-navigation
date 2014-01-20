define( 'dotAccess', function ( require ) {
            function g(h, i, j) {
                var k = i.split('.');
                do {
                    var l = k.shift();
                    h = h[l] || j && (h[l] = {});
                } while (k.length && h);
                return h;
            }
            module.exports = g;
        });