define( 'SignedRequest', function ( require ) {
    'use strict';

    var Base64 = require( 'Base64' );

    var parse = function ( request ) {
        if (! request ) {
            return null;
        }
        request = request.split('.', 2)[1].replace(/\-/g, '+').replace(/\_/g, '/');

        return Base64.decodeObject( request );
    }

    var SignedRequest = {
        'parse' : parse
    };

    return SignedRequest;
});