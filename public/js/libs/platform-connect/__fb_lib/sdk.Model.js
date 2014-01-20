define( 'sdk.Model', function ( require ) {
            var g = require('Type'),
                h = require('ObservableMixin'),
                i = g.extend({
                    constructor: function (j) {
                        this.parent();
                        var k = {}, l = this;
                        ES5(ES5('Object', 'keys', false, j), 'forEach', true, function (m) {
                            k[m] = j[m];
                            l['set' + m] = function (n) {
                                if (n === k[m]) return this;
                                k[m] = n;
                                l.inform(m + '.change', n);
                                return l;
                            };
                            l['get' + m] = function () {
                                return k[m];
                            };
                        });
                    }
                }, h);
            module.exports = i;
        });