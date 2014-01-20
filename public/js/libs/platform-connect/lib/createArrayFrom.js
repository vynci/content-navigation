define( 'createArrayFrom', function ( require ) {
    'use strict';

    var _ = require( 'lodash' );

    function createArrayFrom ( src ) {
        if ( !_.isArray( src ) ) {
            return [ src ];
        }
        if ( src.item ) {
            var length = src.length;
            var arr = new Array( length );
            while ( length-- ) {
                arr[ length ] = src[ length ];
            }
            return arr;
        }
        return Array.prototype.slice.call( src );
    }
    return createArrayFrom;
});