define( 'escapeHTML', function ( require ) {
            var g = /[&<>"'\/]/g,
                h = {
                    '&': '&amp; ',
                    '<': '&lt; ',
                    '>': '&gt; ',
                    '"': '&quot; ',
                    "'": '&#039; ',
                    '/': '&#x2F; '
                };

            function i(j) {
                return j.replace(g, function (k) {
                    return h[k];
                });
            }
            module.exports = i;
        });