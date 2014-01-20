define( 'Flash', function ( require ) {
            var g = require('DOMWrapper'),
                h = require('QueryString'),
                i = require('UserAgent'),
                j = require('copyProperties'),
                k = require('guid'),
                l = {}, m, n = g.getWindow().document;

            function o(t) {
                var u = n.getElementById(t);
                if (u) u.parentNode.removeChild(u);
                delete l[t];
            }

            function p() {
                for (var t in l)
                    if (l.hasOwnProperty(t)) o(t);
            }

            function q(t) {
                return t.replace(/\d+/g, function (u) {
                    return '000'.substring(u.length) + u;
                });
            }

            function r(t) {
                if (!m) {
                    if (i.ie() >= 9) window.attachEvent('onunload', p);
                    m = true;
                }
                l[t] = t;
            }
            var s = {
                embed: function (t, u, v, w) {
                    var x = k();
                    t = encodeURI(t);
                    v = j({
                        allowscriptaccess: 'always',
                        flashvars: w,
                        movie: t
                    }, v || {});
                    if (typeof v.flashvars == 'object') v.flashvars = h.encode(v.flashvars);
                    var y = [];
                    for (var z in v)
                        if (v.hasOwnProperty(z) && v[z]) y.push('<param name="' + encodeURI(z) + '" value="' + encodeURI(v[z]) + '">');
                    var aa = n.createElement('div'),
                        ba = '<object ' + (i.ie() ? 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ' : 'type="application/x-shockwave-flash"') + 'data="' + t + '" ' + 'id="' + x + '">' + y.join('') + '</object>';
                    aa.innerHTML = ba;
                    var ca = u.appendChild(aa.firstChild);
                    r(x);
                    return ca;
                },
                remove: o,
                getVersion: function () {
                    var t = 'Shockwave Flash',
                        u = 'application/x-shockwave-flash',
                        v = 'ShockwaveFlash.ShockwaveFlash',
                        w;
                    if (navigator.plugins && typeof navigator.plugins[t] == 'object') {
                        var x = navigator.plugins[t].description;
                        if (x && navigator.mimeTypes && navigator.mimeTypes[u] && navigator.mimeTypes[u].enabledPlugin) w = x.match(/\d+/g);
                    }
                    if (!w) try {
                        w = (new ActiveXObject(v)).GetVariable('$version').match(/(\d+),(\d+),(\d+),(\d+)/);
                        w = Array.prototype.slice.call(w, 1);
                    } catch (y) {}
                    return w;
                },
                checkMinVersion: function (t) {
                    var u = s.getVersion();
                    if (!u) return false;
                    return q(u.join('.')) >= q(t);
                },
                isAvailable: function () {
                    return !!s.getVersion();
                }
            };
            module.exports = s;
        });