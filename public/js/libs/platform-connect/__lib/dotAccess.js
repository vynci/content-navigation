define( 'dotAccess', function ( require ) {
	'use strict';

	var dotAccess = function ( object, string, create ) {
		var children = string.split( '.' );
		do {
			var child = children.shift();
			object = object[ child ] || create && ( object[ child ] = {} );
		} while ( children.length && object );

		return object;
	};

	return dotAccess;
} );