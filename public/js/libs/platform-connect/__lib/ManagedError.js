define( 'ManagedError', function ( require ) {
            function g(h, i) {
                Error.prototype.constructor.call(this, h);
                this.message = h;
                this.innerError = i;
            }
            g.prototype = new Error();
            g.prototype.constructor = g;
            return g;
        });