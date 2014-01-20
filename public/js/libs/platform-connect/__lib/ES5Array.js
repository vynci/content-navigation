define( 'ES5Array', function ( require ) {
                var g = {};
                g.isArray = function (h) {
                    return Object.prototype.toString.call(h) == '[object Array]';
                };
                return g;
            });