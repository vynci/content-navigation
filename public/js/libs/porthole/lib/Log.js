define( 'Log', function ( require ) {
	'use strict';

	var Log = {
		/**
		 * Utility function to trace to console
		 * @private
		 */
		trace: function(s) {
			if (window['console'] !== undefined) {
				window.console.log('Porthole: ' + s);
			}
		},

		/**
		 * Utility function to send errors to console
		 * @private
		 */
		error: function(s) {
			if (window['console'] !== undefined) {
				window.console.error('Porthole: ' + s);
			}
		}
	};

	return Log;
} );