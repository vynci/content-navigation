define( 'sdk.feature', function ( require ) {
            var g = require('SDKConfig');

            function h(i, j) {
                if (g.features && i in g.features) {
                    var k = g.features[i];
                    if (typeof k === 'object' && typeof k.rate === 'number') {
                        if (k.rate && Math.random() * 100 <= k.rate) {
                            return k.value || true;
                        } else return k.value ? null : false;
                    } else return k;
                }
                return typeof j !== 'undefined' ? j : null;
            }
            module.exports = h;
        });