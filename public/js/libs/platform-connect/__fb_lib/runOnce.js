define( 'runOnce', function ( require ) {
            function g(h) {
                var i, j;
                return function () {
                    if (!i) {
                        i = true;
                        j = h();
                    }
                    return j;
                };
            }
            module.exports = g;
        });