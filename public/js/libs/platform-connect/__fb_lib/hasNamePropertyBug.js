define( 'hasNamePropertyBug', function ( require ) {
            var g = require('guid'),
                h;

            function i() {
                var k = document.createElement("form"),
                    l = k.appendChild(document.createElement("input"));
                l.name = g();
                h = l !== k.elements[l.name];
                k = l = null;
                return h;
            }

            function j() {
                return typeof h === 'undefined' ? i() : h;
            }
            module.exports = j;
        });