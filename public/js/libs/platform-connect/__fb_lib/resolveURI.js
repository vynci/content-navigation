define( 'resolveURI', function ( require ) {
            function g(h) {
                if (!h) return window.location.href;
                h = h.replace(/&/g, '&amp; ').replace(/"/g, '&quot; ');
                var i = document.createElement('div');
                i.innerHTML = '<a href="' + h + '"></a>';
                return i.firstChild.href;
            }
            module.exports = g;
        });