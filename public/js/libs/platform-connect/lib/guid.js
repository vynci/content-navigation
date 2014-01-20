define( 'guid', function ( require ) {
	'use strict';

	function guid () {
	    return 'f' + ( Math.random() * ( 1 << 30 ) ).toString( 16 ).replace( '.', '' );
	}
	return guid;
} );