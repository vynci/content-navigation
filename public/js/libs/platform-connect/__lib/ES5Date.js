define( 'ES5Date', function ( require ) {
                var g = {};
                g.now = function () {
                    return new Date().getTime();
                };
                return g;
            });