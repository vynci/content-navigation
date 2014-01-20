define( 'sdk.Anim', function ( require ) {
            var g = require('sdk.DOM'),
                h = {
                    ate: function (i, j, k, l) {
                        k = !isNaN(parseFloat(k)) && k >= 0 ? k : 750;
                        var m = 40,
                            n = {}, o = {}, p = null,
                            q = setInterval(ES5(function () {
                                if (!p) p = ES5('Date', 'now', false);
                                var r = 1;
                                if (k != 0) r = Math.min((ES5('Date', 'now', false) - p) / k, 1);
                                for (var s in j)
                                    if (j.hasOwnProperty(s)) {
                                        var t = j[s];
                                        if (!n[s]) {
                                            var u = g.getStyle(i, s);
                                            if (u === false) return;
                                            n[s] = this._parseCSS(u + '');
                                        }
                                        if (!o[s]) o[s] = this._parseCSS(t.toString());
                                        var v = '';
                                        ES5(n[s], 'forEach', true, function (w, x) {
                                            if (isNaN(o[s][x].numPart) && o[s][x].textPart == '?') {
                                                v = w.numPart + w.textPart;
                                            } else if (isNaN(w.numPart)) {
                                                v = w.textPart;
                                            } else v += (w.numPart + Math.ceil((o[s][x].numPart - w.numPart) * Math.sin(Math.PI / 2 * r))) + o[s][x].textPart + ' ';
                                        });
                                        g.setStyle(i, s, v);
                                    }
                                if (r == 1) {
                                    clearInterval(q);
                                    if (l) l(i);
                                }
                            }, 'bind', true, this), m);
                    },
                    _parseCSS: function (i) {
                        var j = [];
                        ES5(i.split(' '), 'forEach', true, function (k) {
                            var l = parseInt(k, 10);
                            j.push({
                                numPart: l,
                                textPart: k.replace(l, '')
                            });
                        });
                        return j;
                    }
                };
            module.exports = h;
        });