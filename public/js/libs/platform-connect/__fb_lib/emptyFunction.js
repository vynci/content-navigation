define( 'emptyFunction', function ( require ) {
            var g = require('copyProperties');

            function h(j) {
                return function () {
                    return j;
                };
            }

            function i() {}
            g(i, {
                thatReturns: h,
                thatReturnsFalse: h(false),
                thatReturnsTrue: h(true),
                thatReturnsNull: h(null),
                thatReturnsThis: function () {
                    return this;
                },
                thatReturnsArgument: function (j) {
                    return j;
                }
            });
            module.exports = i;
        });