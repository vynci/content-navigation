define( 'ObservableMixin', function ( require ) {
	'use strict';

	var ObservableMixin = function () {
		this.__observableEvents = {};
	};

	ObservableMixin.prototype = {
		'inform' : function ( event ) {
			var args = Array.prototype.slice.call( arguments, 1);
			var subscribers = Array.prototype.slice.call( this.getSubscribers( event ) );
			for ( var i = 0; i < subscribers.length; i++ ) {
				if ( subscribers[ i ] === null ) {
					continue;
				}
				try {
					subscribers[ i ].apply( this, args );
				} catch ( error ) {
					setTimeout( function () {
						throw error;
					}, 0 );
				}
			}
			return this;
		},
		'getSubscribers' : function ( event ) {
			return this.__observableEvents[ event ] || ( this.__observableEvents[ event ] = [] );
		},
		'clearSubscribers' : function ( event ) {
			if ( event ) {
				this.__observableEvents[ event ] = [];
			}
			return this;
		},
		'clearAllSubscribers' : function () {
			this.__observableEvents = {};
			return this;
		},
		'subscribe' : function ( event, callback ) {
			var subscribers = this.getSubscribers( event );
			subscribers.push( callback );
			return this;
		},
		'unsubscribe' : function ( event, callback ) {
			var subscribers = this.getSubscribers( event );
			for ( var i = 0; i < subscribers.length; i++ ) {
				if ( subscribers[ i ] === callback ) {
					subscribers.splice( i, 1 );
					break;
				}
			}
			return this;
		},
		'monitor' : function ( event, isReady ) {
			if ( !isReady() ) {
				var listener = function () {
					if ( isReady.apply( isReady, arguments ) ) {
						this.unsubscribe( event, listener );
					}
				};
				this.subscribe( event, listener );
			}
			return this;
		}
	};

	return ObservableMixin;
} );