define( 'Queue', function ( require ) {
            var g = require('copyProperties'),
                h = {};

            function i(j) {
                this._opts = g({
                    interval: 0,
                    processor: null
                }, j);
                this._queue = [];
                this._stopped = true;
            }
            i.prototype._dispatch = function (j) {
                if (this._stopped || this._queue.length === 0) return;
                if (!this._opts.processor) {
                    this._stopped = true;
                    throw new Error('No processor available');
                }
                if (this._opts.interval) {
                    this._opts.processor.call(this, this._queue.shift());
                    this._timeout = setTimeout(ES5(this._dispatch, 'bind', true, this), this._opts.interval);
                } else
                    while (this._queue.length) this._opts.processor.call(this, this._queue.shift());
            };
            i.prototype.enqueue = function (j) {
                if (this._opts.processor && !this._stopped) {
                    this._opts.processor.call(this, j);
                } else this._queue.push(j);
                return this;
            };
            i.prototype.start = function (j) {
                if (j) this._opts.processor = j;
                this._stopped = false;
                this._dispatch();
                return this;
            };
            i.prototype.dispatch = function () {
                this._dispatch(true);
            };
            i.prototype.stop = function (j) {
                this._stopped = true;
                if (j) clearTimeout(this._timeout);
                return this;
            };
            i.prototype.merge = function (j, k) {
                this._queue[k ? 'unshift' : 'push'].apply(this._queue, j._queue);
                j._queue = [];
                this._dispatch();
                return this;
            };
            i.prototype.getLength = function () {
                return this._queue.length;
            };
            i.get = function (j, k) {
                var l;
                if (j in h) {
                    l = h[j];
                } else l = h[j] = new i(k);
                return l;
            };
            i.exists = function (j) {
                return j in h;
            };
            i.remove = function (j) {
                return delete h[j];
            };
            module.exports = i;
        });