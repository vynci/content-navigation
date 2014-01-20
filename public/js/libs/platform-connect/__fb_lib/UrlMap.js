define('UrlMap', function(require) {
    var g = require('UrlMapConfig'),
        h = {
            resolve: function(i, j) {
                var k = typeof j == 'undefined' ? location.protocol.replace(':', '') : j ? 'https' : 'http';
                if (i in g) return k + '://' + g[i];
                if (typeof j == 'undefined' && i + '_' + k in g) return k + '://' + g[i + '_' + k];
                if (j !== true && i + '_http' in g) return 'http://' + g[i + '_http'];
                if (j !== false && i + '_https' in g) return 'https://' + g[i + '_https'];
            }
        };
    module.exports = h;
});