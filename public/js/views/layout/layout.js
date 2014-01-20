define( function ( require ) {
	'use strict';

	var Marionette   = require( 'marionette' );

	return Marionette.Layout.extend( {

		template: '#main-layout',

		regions: {
			headerRegion: '#header-region',
			leftRegion: '#left-region',
			centerRegion: '#center-region',
			footerRegion: '#footer-region',
		}

	} );

} );
