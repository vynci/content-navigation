define( 'createIframe', function ( require ) {
	'use strict';

	var _                = require( 'lodash' );
	var guid             = require( 'guid' );
	var DOMEventListener = require( 'DOMEventListener' );


	// name property bug
	var _namePropertyBugExists;
	var testNameProperty = function () {
		var form = document.createElement( 'form' );
		var input = form.appendChild( document.createElement( 'input' ) );
		input.name = guid();
		_namePropertyBugExists = input !== form.elements[ input.name ];
		form = input = null;
		return _namePropertyBugExists;
	};
	var hasNamePropertyBug = function () {
		return typeof _namePropertyBugExists === 'undefined' ? testNameProperty() : _namePropertyBugExists;
	};


	var createIframe = function ( options ) {
		options = _.extend( {}, options );

		var frame;
		var name = options.name || guid();
		var root = options.root;
		var style = options.style || {
			'border' : 'none'
		};
		var url = options.url;
		var callback = options.onLoad;
		if ( hasNamePropertyBug() ) {
			frame = document.createElement( '<iframe name="' + name + '"/>' );
		} else {
			frame = document.createElement( 'iframe' );
			frame.name = name;
		}
		delete options.style;
		delete options.name;
		delete options.url;
		delete options.root;
		delete options.onLoad;

		var fStyles = _.extend( {
			'frameBorder'       : 0,
			'allowTransparency' : true,
			'scrolling'         : 'no'
		}, options );
		if ( fStyles.width ) {
			frame.width = fStyles.width + 'px';
		}
		if ( fStyles.height ) {
			frame.height = fStyles.height + 'px';
		}
		delete fStyles.height;
		delete fStyles.width;
		for ( var fStyle in fStyles ) {
			if ( fStyles.hasOwnProperty( fStyle ) ) {
				frame.setAttribute( fStyle, fStyles[ fStyle ] );
			}
		}
		_.extend( frame.style, style );

		// frame.src = 'javascript:false';
		root.appendChild( frame );

		if ( callback ) {
			var listener = DOMEventListener.add( frame, 'load', function ( response ) {
				listener.remove();
				callback( response );
			} );
		}

		// load
		frame.src = url;

		return frame;
	};

	return createIframe;
} );