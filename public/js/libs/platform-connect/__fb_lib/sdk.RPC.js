define( 'sdk.RPC', function ( require ) {
            var g = require('Assert'),
                h = require('JSONRPC'),
                i = require('Queue'),
                j = new i(),
                k = new h(function (m) {
                    j.enqueue(m);
                }),
                l = {
                    local: k.local,
                    remote: k.remote,
                    stub: ES5(k.stub, 'bind', true, k),
                    setInQueue: function (m) {
                        g.isInstanceOf(i, m);
                        m.start(function (n) {
                            k.read(n);
                        });
                    },
                    getOutQueue: function () {
                        return j;
                    }
                };
            module.exports = l;
        });