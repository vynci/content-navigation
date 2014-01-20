define( 'domReady', function ( require ) {
    'use strict';

    var callbacks;
    var ready = 'readyState' in document ? /loaded|complete/.test( document.readyState ) : !! document.body;

    var invokeCallbacks = function () {
        if ( !callbacks ) {
            return;
        }
        var callback;
        while ( callback = callbacks.shift() ) {
            callback();
        }
        callbacks = null;
    };

    var domReady = function ( callback ) {
        if (callbacks) {
            callbacks.push( callback );
            return;
        } else {
            callback();
        }
    };

    if ( !ready ) {
        callbacks = [];
        if ( document.addEventListener ) {
            document.addEventListener( 'DOMContentLoaded', invokeCallbacks, false );
            window.addEventListener( 'load', invokeCallbacks, false );
        } else if ( document.attachEvent ) {
            document.attachEvent( 'onreadystatechange', invokeCallbacks );
            window.attachEvent( 'onload', invokeCallbacks );
        }
        if ( document.documentElement.doScroll && window == window.top ) {
            var testScroll = function() {
                try {
                    document.documentElement.doScroll( 'left' );
                } catch ( error ) {
                    setTimeout( testScroll, 0 );
                    return;
                }
                invokeCallbacks();
            };
            testScroll();
        }
    }

    return domReady;
}, 3);