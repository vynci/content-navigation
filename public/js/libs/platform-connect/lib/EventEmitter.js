define( 'EventEmitter', function ( require ) {
	'use strict';

	var _ = require( 'lodash' );

	var EventEmitter = {
		'subscribers' : function () {
			if ( !this._subscribersMap ) {
				this._subscribersMap = {};
			}
			return this._subscribersMap;
		},
		'subscribe' : function ( event, callback ) {
			var subs = this.subscribers();
			if ( !subs[ event ] ) {
				subs[ event ] = [ callback ];
			} else {
				subs[ event ].push( callback );
			}
		},
		'unsubscribe' : function ( event, callback ) {
			var subs = this.subscribers()[ event ];
			if ( subs ) {
				_.each( subs, function ( sub, index) {
					if ( sub === callback ) {
						subs[ index ] = null;
					}
				} );
			}
		},
		'monitor' : function ( event, callback ) {

			if ( !callback() ) {
				var self = this;
				var test = function () {
					if ( callback.apply( callback, arguments ) ) {
						self.unsubscribe( event, test );
					}
				};
				this.subscribe( event, test );
			}
		},
		'clear' : function ( event ) {
			delete this.subscribers()[ event ];
		},
		'fire' : function ( event ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var subs = this.subscribers()[ event ];
			if ( subs ) {
				_.each( subs, function ( sub ) {
					if ( sub ) {
						sub.apply( this, args );
					}
				});
			}
		}
	};

	return EventEmitter;
} );