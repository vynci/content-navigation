define( 'Model', function ( require ) {
	'use strict';

	var ES5             = require( 'ES5' );
	var Type            = require( 'Type' );
	var ObservableMixin = require( 'ObservableMixin' );

	var Model = Type.extend( {
		'constructor' : function ( properties ) {
			this.parent();
			var attributes = {};
			var self = this;

			ES5( ES5( 'Object', 'keys', false, properties ), 'forEach', true, function ( key ) {
				attributes[ key ] = properties[ key ];

				// setter
				self['set' +  key ] = function ( value ) {
					if ( value === attributes[ key ] ) {
						return this;
					}
					attributes[ key ] = value;
					self.inform( key  + '.change', value);
					return self;
				};
				// getter
				self[ 'get' +  key ] = function () {
					return attributes[ key ];
				};
			});
		}
	}, ObservableMixin);

	return Model;
} );