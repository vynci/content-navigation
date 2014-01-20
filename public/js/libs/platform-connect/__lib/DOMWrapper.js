define( 'DOMWrapper', function ( require ) {
	'use strict';

	var root;
	var window;
	var DOMWrapper = {
		'setRoot' : function ( j ) {
			root = j;
		},
		'getRoot' : function () {
			return root || document.body;
		},
		'setWindow' : function ( j ) {
			window = j;
		},
		'getWindow' : function () {
			return window || self;
		}
	};

	return DOMWrapper;
} );