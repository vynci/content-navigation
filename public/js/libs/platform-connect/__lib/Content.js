define( 'Content', function ( require ) {
    'use strict';

    var domReady  = require( 'domReady' );
    var Log       = require( 'Log' );
    var UserAgent = require( 'UserAgent' );

    var root;

    var Content = {
        'append' : function ( element , parent ) {
            if ( !parent ) {
                if ( !root ) {
                    root = parent = document.getElementById( 'pc-root' );
                    if ( !parent ) {
                        Log.warn( 'The "pc-root" div has not been created, auto-creating' );
                        root = parent = document.createElement( 'div' );
                        parent.id = 'pc-root';
                        if ( UserAgent.ie() || !document.body ) {
                            domReady( function () {
                                document.body.appendChild( parent );
                            } );
                        } else {
                            document.body.appendChild( parent );
                        }
                    }
                    parent.className += ' pc_reset';
                } else {
                    parent = root;
                }
            }
            if ( typeof element == 'string' ) {
                var div = document.createElement( 'div' );
                parent.appendChild( div ).innerHTML = element ;
                return div;
            } else {
                return parent.appendChild( element );
            }
        },

        'appendHidden' : function ( element ) {
            var parent;
            if ( !parent ) {
                parent = document.createElement( 'div' );
                var style = parent.style;
                style.position = 'absolute';
                style.top = '-10000px';
                style.width = style.height = 0;
                parent = Content.append( parent );
            }
            return Content.append( element, parent );
        },

        'submitToTarget' : function ( href, GET ) {
            var form = document.createElement( 'form' );
            form.action = href.url;
            form.target = href.target;
            form.method = ( GET ) ? 'GET' : 'POST';
            Content.appendHidden( form );
            for ( var param in href.params ) {
                if ( href.params.hasOwnProperty( param ) ) {
                    var value = href.params[ param ];
                    if ( value !== null && value !== undefined ) {
                        var input = document.createElement( 'input' );
                        input.name = param;
                        input.value = value;
                        form.appendChild( input );
                    }
                }
            }
            form.submit();
            form.parentNode.removeChild( form );
        }
    };

    return Content;
} );