define( 'Log', function ( require ) {
            var g = require('sprintf'),
                h = {
                    DEBUG: 3,
                    INFO: 2,
                    WARNING: 1,
                    ERROR: 0
                };

            function i(k, l) {
                var m = Array.prototype.slice.call(arguments, 2),
                    n = g.apply(null, m),
                    o = window.console;
                if (o && j.level >= l) o[k in o ? k : 'log'](n);
            }
            var j = {
                level: -1,
                Level: h,
                debug: ES5(i, 'bind', true, null, 'debug', h.DEBUG),
                info: ES5(i, 'bind', true, null, 'info', h.INFO),
                warn: ES5(i, 'bind', true, null, 'warn', h.WARNING),
                error: ES5(i, 'bind', true, null, 'error', h.ERROR)
            };
            module.exports = j;
        });