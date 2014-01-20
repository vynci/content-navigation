define( 'sdk.SignedRequest', function ( require ) {
            var g = require('Base64');

            function h(j) {
                if (!j) return null;
                var k = j.split('.', 2)[1].replace(/\-/g, '+').replace(/\_/g, '/');
                return g.decodeObject(k);
            }
            var i = {
                parse: h
            };
            module.exports = i;
        });