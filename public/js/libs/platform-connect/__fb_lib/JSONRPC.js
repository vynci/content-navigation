define( 'JSONRPC', function ( require ) {
            var g = require('copyProperties'),
                h = require('Log');

            function i(j) {
                this._counter = 0;
                this._callbacks = {};
                this.remote = ES5(function (k) {
                    this._context = k;
                    return this.remote;
                }, 'bind', true, this);
                this.local = {};
                this._write = j;
            }
            g(i.prototype, {
                stub: function (j) {
                    this.remote[j] = ES5(function () {
                        var k = Array.prototype.slice.call(arguments),
                            l = {
                                jsonrpc: '2.0',
                                method: j
                            };
                        if (typeof k[k.length - 1] == 'function') {
                            l.id = ++this._counter;
                            this._callbacks[l.id] = k.pop();
                        }
                        l.params = k;
                        this._write(ES5('JSON', 'stringify', false, l), this._context || {
                            method: j
                        });
                    }, 'bind', true, this);
                },
                read: function (j, k) {
                    var l = ES5('JSON', 'parse', false, j),
                        m = l.id;
                    if (!l.method) {
                        if (!this._callbacks[m]) {
                            h.warn('Could not find callback %s', m);
                            return;
                        }
                        var n = this._callbacks[m];
                        delete this._callbacks[m];
                        delete l.id;
                        delete l.jsonrpc;
                        n(l);
                        return;
                    }
                    var o = this,
                        p = this.local[l.method],
                        q;
                    if (m) {
                        q = function (t, u) {
                            var v = {
                                jsonrpc: '2.0',
                                id: m
                            };
                            v[t] = u;
                            setTimeout(function () {
                                o._write(ES5('JSON', 'stringify', false, v), k);
                            }, 0);
                        };
                    } else q = function () {}; if (!p) {
                        h.error('Method "%s" has not been defined', l.method);
                        q('error', {
                            code: -32601,
                            message: 'Method not found',
                            data: l.method
                        });
                        return;
                    }
                    l.params.push(ES5(q, 'bind', true, null, 'result'));
                    l.params.push(ES5(q, 'bind', true, null, 'error'));
                    try {
                        var s = p.apply(k || null, l.params);
                        if (typeof s !== 'undefined') q('result', s);
                    } catch (r) {
                        h.error('Invokation of RPC method %s resulted in the error: %s', l.method, r.message);
                        q('error', {
                            code: -32603,
                            message: 'Internal error',
                            data: r.message
                        });
                    }
                }
            });
            module.exports = i;
        });