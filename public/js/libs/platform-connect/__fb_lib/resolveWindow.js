define( 'resolveWindow', function ( require ) {
            function g(h) {
                var i = window,
                    j = h.split('.');
                try {
                    for (var l = 0; l < j.length; l++) {
                        var m = j[l],
                            n = /^frames\[['"]?([a-zA-Z0-9\-_]+)['"]?\]$/.exec(m);
                        if (n) {
                            i = i.frames[n[1]];
                        } else if (m === 'opener' || m === 'parent' || m === 'top') {
                            i = i[m];
                        } else return null;
                    }
                } catch (k) {
                    return null;
                }
                return i;
            }
            module.exports = g;
        });