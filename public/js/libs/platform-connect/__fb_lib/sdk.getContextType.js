define( 'sdk.getContextType', function ( require ) {
            var g = require('UserAgent'),
                h = require('sdk.Runtime');

            function i() {
                if (g.nativeApp()) return 3;
                if (g.mobile()) return 2;
                if (h.isEnvironment(h.ENVIRONMENTS.CANVAS)) return 5;
                return 1;
            }
            module.exports = i;
        });