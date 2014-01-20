// return a formatted string
define( 'sprintf', function ( require ) {
	'use strict';

	function sprintf ( string ) {
		var trimmed = Array.prototype.slice.call( arguments, 1 );
		var i = 0;
		return string.replace( /%s/g, function ( k ) {
			return trimmed[ i++ ];
		} );
	}

	return sprintf;
} );