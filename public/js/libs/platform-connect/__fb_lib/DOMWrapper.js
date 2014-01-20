define( 'DOMWrapper', function ( require ) {
            var g, h, i = {
                    setRoot: function (j) {
                        g = j;
                    },
                    getRoot: function () {
                        return g || document.body;
                    },
                    setWindow: function (j) {
                        h = j;
                    },
                    getWindow: function () {
                        return h || self;
                    }
                };
            module.exports = i;
        });