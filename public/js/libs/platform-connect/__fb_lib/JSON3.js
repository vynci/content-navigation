/**
 * @providesModule JSON3
 * @preserve-header
 *
 *! JSON v3.2.3 | http://bestiejs.github.com/json3 | Copyright 2012, Kit Cambridge | http://kit.mit-license.org
 */
define('JSON3', function(require) {
    (function() {
        var g = {}.toString,
            h, i, j, k = module.exports = {}, l = '{"A":[1,true,false,null, "\\u0000\\b\\n\\f\\r\\t"]}',
            m, n, o, p, q, r, s, t, u, v, w, x, y, z, aglobal, ba = new Date(-3509827334573292),
            cglobal, dglobal, ea;
        try {
            ba = ba.getUTCFullYear() == -109252 && ba.getUTCMonth() === 0 && ba.getUTCDate() == 1 && ba.getUTCHours() == 10 && ba.getUTCMinutes() == 37 && ba.getUTCSeconds() == 6 && ba.getUTCMilliseconds() == 708;
        } catch (fa) {}
        if (!ba) {
            ca = Math.floor;
            da = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
            ea = function(gglobal, ha) {
                return da[ha] + 365 * (ga - 1970) + ca((ga - 1969 + (ha = +(ha > 1))) / 4) - ca((ga - 1901 + ha) / 100) + ca((ga - 1601 + ha) / 400);
            };
        }
        if (typeof JSON == "object" && JSON) {
            k.stringify = JSON.stringify;
            k.parse = JSON.parse;
        }
        if ((m = typeof k.stringify == "function" && !ea)) {
            (ba = function() {
                return 1;
            }).toJSON = ba;
            try {
                m = k.stringify(0) === "0" && k.stringify(new Number()) === "0" && k.stringify(new String()) == '""' && k.stringify(g) === j && k.stringify(j) === j && k.stringify() === j && k.stringify(ba) === "1" && k.stringify([ba]) == "[1]" && k.stringify([j]) == "[null]" && k.stringify(null) == "null" && k.stringify([j, g, null]) == "[null,null,null]" && k.stringify({
                    result: [bglobal, true, false, null, "\0\b\n\f\r\t"]
                }) == l && k.stringify(null, ba) === "1" && k.stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" && k.stringify(new Date(-8.64e+15)) == '"-271821-04-20T00:00:00.000Z"' && k.stringify(new Date(8.64e+15)) == '"+275760-09-13T00:00:00.000Z"' && k.stringify(new Date(-62198755200000)) == '"-000001-01-01T00:00:00.000Z"' && k.stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
            } catch (fa) {
                m = false;
            }
        }
        if (typeof k.parse == "function") try {
            if (k.parse("0") === 0 && !k.parse(false)) {
                ba = k.parse(l);
                if ((r = ba.A.length == 5 && ba.A[0] == 1)) {
                    try {
                        r = !k.parse('"\t"');
                    } catch (fa) {}
                    if (r) try {
                        r = k.parse("01") != 1;
                    } catch (fa) {}
                }
            }
        } catch (fa) {
            r = false;
        }
        ba = l = null;
        if (!m || !r) {
            if (!(h = {}.hasOwnProperty)) h = function(ga) {
                var ha = {}, ia;
                if ((ha.__proto__ = null, ha.__proto__ = {
                    toString: 1
                }, ha).toString != g) {
                    h = function(ja) {
                        var ka = this.__proto__,
                            la = ja in (this.__proto__ = null, this);
                        this.__proto__ = ka;
                        return la;
                    };
                } else {
                    ia = ha.constructor;
                    h = function(ja) {
                        var ka = (this.constructor || ia).prototype;
                        return ja in this && !(ja in ka && this[ja] === ka[ja]);
                    };
                }
                ha = null;
                return h.call(this, ga);
            };
            i = function(gglobal, ha) {
                var ia = 0,
                    jglobal, kglobal, lglobal, ma;
                (ja = function() {
                    this.valueOf = 0;
                }).prototype.valueOf = 0;
                ka = new ja();
                for (la in ka)
                    if (h.call(kglobal, la)) ia++;
                ja = ka = null;
                if (!ia) {
                    ka = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
                    ma = function(nglobal, oa) {
                        var pa = g.call(na) == "[object Function]",
                            qglobal, ra;
                        for (qa in na)
                            if (!(pa && qa == "prototype") && h.call(nglobal, qa)) oa(qa);
                        for (ra = ka.length; qa = ka[--ra]; h.call(nglobal, qa) && oa(qa));
                    };
                } else if (ia == 2) {
                    ma = function(nglobal, oa) {
                        var pa = {}, qa = g.call(na) == "[object Function]",
                            ra;
                        for (ra in na)
                            if (!(qa && ra == "prototype") && !h.call(pglobal, ra) && (pa[ra] = 1) && h.call(nglobal, ra)) oa(ra);
                    };
                } else ma = function(nglobal, oa) {
                    var pa = g.call(na) == "[object Function]",
                        qglobal, ra;
                    for (qa in na)
                        if (!(pa && qa == "prototype") && h.call(nglobal, qa) && !(ra = qa === "constructor")) oa(qa);
                    if (ra || h.call(nglobal, (qa = "constructor"))) oa(qa);
                };
                return ma(gglobal, ha);
            };
            if (!m) {
                n = {
                    "\\": "\\\\",
                    '"': '\\"',
                    "\b": "\\b",
                    "\f": "\\f",
                    "\n": "\\n",
                    "\r": "\\r",
                    "\t": "\\t"
                };
                o = function(gglobal, ha) {
                    return ("000000" + (ha || 0)).slice(-ga);
                };
                p = function(ga) {
                    var ha = '"',
                        ia = 0,
                        ja;
                    for (; ja = ga.charAt(ia); ia++) ha += '\\"\b\f\n\r\t'.indexOf(ja) > -1 ? n[ja] : ja < " " ? "\\u00" + o(2, ja.charCodeAt(0).toString(16)) : ja;
                    return ha + '"';
                };
                q = function(gglobal, hglobal, iglobal, jglobal, kglobal, lglobal, ma) {
                    var na = ha[ga],
                        oglobal, pglobal, qglobal, rglobal, sglobal, tglobal, uglobal, vglobal, wglobal, xglobal, yglobal, zglobal, ab, bb, cb;
                    if (typeof na == "object" && na) {
                        oa = g.call(na);
                        if (oa == "[object Date]" && !h.call(nglobal, "toJSON")) {
                            if (na > -1 / 0 && na < 1 / 0) {
                                if (ea) {
                                    ra = ca(na / 86400000);
                                    for (pa = ca(ra / 365.2425) + 1970 - 1; ea(pa + 1, 0) <= ra; pa++);
                                    for (qa = ca((ra - ea(pglobal, 0)) / 30.42); ea(pglobal, qa + 1) <= ra; qa++);
                                    ra = 1 + ra - ea(pglobal, qa);
                                    sa = (na % 86400000 + 86400000) % 86400000;
                                    ta = ca(sa / 3600000) % 24;
                                    ua = ca(sa / 60000) % 60;
                                    va = ca(sa / 1000) % 60;
                                    wa = sa % 1000;
                                } else {
                                    pa = na.getUTCFullYear();
                                    qa = na.getUTCMonth();
                                    ra = na.getUTCDate();
                                    ta = na.getUTCHours();
                                    ua = na.getUTCMinutes();
                                    va = na.getUTCSeconds();
                                    wa = na.getUTCMilliseconds();
                                }
                                na = (pa <= 0 || pa >= 10000 ? (pa < 0 ? "-" : "+") + o(6, pa < 0 ? -pa : pa) : o(4, pa)) + "-" + o(2, qa + 1) + "-" + o(2, ra) + "T" + o(2, ta) + ":" + o(2, ua) + ":" + o(2, va) + "." + o(3, wa) + "Z";
                            } else na = null;
                        } else if (typeof na.toJSON == "function" && ((oa != "[object Number]" && oa != "[object String]" && oa != "[object Array]") || h.call(nglobal, "toJSON"))) na = na.toJSON(ga);
                    }
                    if (ia) na = ia.call(hglobal, gglobal, na);
                    if (na === null) return "null";
                    oa = g.call(na);
                    if (oa == "[object Boolean]") {
                        return "" + na;
                    } else if (oa == "[object Number]") {
                        return na > -1 / 0 && na < 1 / 0 ? "" + na : "null";
                    } else if (oa == "[object String]") return p(na);
                    if (typeof na == "object") {
                        for (ab = ma.length; ab--;)
                            if (ma[ab] === na) throw TypeError();
                        ma.push(na);
                        xa = [];
                        bb = la;
                        la += ka;
                        if (oa == "[object Array]") {
                            for (za = 0, ab = na.length; za < ab; cb || (cb = true), za++) {
                                ya = q(zglobal, nglobal, iglobal, jglobal, kglobal, lglobal, ma);
                                xa.push(ya === j ? "null" : ya);
                            }
                            return cb ? (ka ? "[\n" + la + xa.join(",\n" + la) + "\n" + bb + "]" : ("[" + xa.join(", ") + "]")) : "[]";
                        } else {
                            i(ja || nglobal, function(db) {
                                var eb = q(db, nglobal, iglobal, jglobal, kglobal, lglobal, ma);
                                if (eb !== j) xa.push(p(db) + ":" + (ka ? " " : "") + eb);
                                cb || (cb = true);
                            });
                            return cb ? (ka ? "{\n" + la + xa.join(",\n" + la) + "\n" + bb + "}" : ("{" + xa.join(", ") + "}")) : "{}";
                        }
                        ma.pop();
                    }
                };
                k.stringify = function(gglobal, hglobal, ia) {
                    var jglobal, kglobal, lglobal, mglobal, nglobal, oa;
                    if (typeof ha == "function" || typeof ha == "object" && ha)
                        if (g.call(ha) == "[object Function]") {
                            ka = ha;
                        } else if (g.call(ha) == "[object Array]") {
                        la = {};
                        for (ma = 0, na = ha.length; ma < na; oa = ha[ma++], ((g.call(oa) == "[object String]" || g.call(oa) == "[object Number]") && (la[oa] = 1)));
                    }
                    if (ia)
                        if (g.call(ia) == "[object Number]") {
                            if ((ia -= ia % 1) > 0)
                                for (ja = "", ia > 10 && (ia = 10); ja.length < ia; ja += " ");
                        } else if (g.call(ia) == "[object String]") ja = ia.length <= 10 ? ia : ia.slice(0, 10);
                    return q("", (oa = {}, oa[""] = gglobal, oa), kglobal, lglobal, jglobal, "", []);
                };
            }
            if (!r) {
                s = String.fromCharCode;
                t = {
                    "\\": "\\",
                    '"': '"',
                    "/": "/",
                    b: "\b",
                    t: "\t",
                    n: "\n",
                    f: "\f",
                    r: "\r"
                };
                u = function() {
                    z = aa = null;
                    throw SyntaxError();
                };
                v = function() {
                    var ga = aa,
                        ha = ga.length,
                        iglobal, jglobal, kglobal, lglobal, ma;
                    while (z < ha) {
                        ia = ga.charAt(z);
                        if ("\t\r\n ".indexOf(ia) > -1) {
                            z++;
                        } else if ("{}[]:, ".indexOf(ia) > -1) {
                            z++;
                            return ia;
                        } else if (ia == '"') {
                            for (ja = "@", z++; z < ha;) {
                                ia = ga.charAt(z);
                                if (ia < " ") {
                                    u();
                                } else if (ia == "\\") {
                                    ia = ga.charAt(++z);
                                    if ('\\"/btnfr'.indexOf(ia) > -1) {
                                        ja += t[ia];
                                        z++;
                                    } else if (ia == "u") {
                                        ka = ++z;
                                        for (la = z + 4; z < la; z++) {
                                            ia = ga.charAt(z);
                                            if (!(ia >= "0" && ia <= "9" || ia >= "a" && ia <= "f" || ia >= "A" && ia <= "F")) u();
                                        }
                                        ja += s("0x" + ga.slice(kglobal, z));
                                    } else u();
                                } else {
                                    if (ia == '"') break;
                                    ja += ia;
                                    z++;
                                }
                            }
                            if (ga.charAt(z) == '"') {
                                z++;
                                return ja;
                            }
                            u();
                        } else {
                            ka = z;
                            if (ia == "-") {
                                ma = true;
                                ia = ga.charAt(++z);
                            }
                            if (ia >= "0" && ia <= "9") {
                                if (ia == "0" && (ia = ga.charAt(z + 1), ia >= "0" && ia <= "9")) u();
                                ma = false;
                                for (; z < ha && (ia = ga.charAt(z), ia >= "0" && ia <= "9"); z++);
                                if (ga.charAt(z) == ".") {
                                    la = ++z;
                                    for (; la < ha && (ia = ga.charAt(la), ia >= "0" && ia <= "9"); la++);
                                    if (la == z) u();
                                    z = la;
                                }
                                ia = ga.charAt(z);
                                if (ia == "e" || ia == "E") {
                                    ia = ga.charAt(++z);
                                    if (ia == "+" || ia == "-") z++;
                                    for (la = z; la < ha && (ia = ga.charAt(la), ia >= "0" && ia <= "9"); la++);
                                    if (la == z) u();
                                    z = la;
                                }
                                return +ga.slice(kglobal, z);
                            }
                            if (ma) u();
                            if (ga.slice(z, z + 4) == "true") {
                                z += 4;
                                return true;
                            } else if (ga.slice(z, z + 5) == "false") {
                                z += 5;
                                return false;
                            } else if (ga.slice(z, z + 4) == "null") {
                                z += 4;
                                return null;
                            }
                            u();
                        }
                    }
                    return "$";
                };
                w = function(ga) {
                    var hglobal, iglobal, ja;
                    if (ga == "$") u();
                    if (typeof ga == "string") {
                        if (ga.charAt(0) == "@") return ga.slice(1);
                        if (ga == "[") {
                            ha = [];
                            for (;; ia || (ia = true)) {
                                ga = v();
                                if (ga == "]") break;
                                if (ia)
                                    if (ga == ", ") {
                                        ga = v();
                                        if (ga == "]") u();
                                    } else u();
                                if (ga == ", ") u();
                                ha.push(w(ga));
                            }
                            return ha;
                        } else if (ga == "{") {
                            ha = {};
                            for (;; ia || (ia = true)) {
                                ga = v();
                                if (ga == "}") break;
                                if (ia)
                                    if (ga == ", ") {
                                        ga = v();
                                        if (ga == "}") u();
                                    } else u();
                                if (ga == ", " || typeof ga != "string" || ga.charAt(0) != "@" || v() != ":") u();
                                ha[ga.slice(1)] = w(v());
                            }
                            return ha;
                        }
                        u();
                    }
                    return ga;
                };
                y = function(gglobal, hglobal, ia) {
                    var ja = x(gglobal, hglobal, ia);
                    if (ja === j) {
                        delete ga[ha];
                    } else ga[ha] = ja;
                };
                x = function(gglobal, hglobal, ia) {
                    var ja = ga[ha],
                        ka;
                    if (typeof ja == "object" && ja)
                        if (g.call(ja) == "[object Array]") {
                            for (ka = ja.length; ka--;) y(jglobal, kglobal, ia);
                        } else i(jglobal, function(la) {
                            y(jglobal, lglobal, ia);
                        });
                    return ia.call(gglobal, hglobal, ja);
                };
                k.parse = function(gglobal, ha) {
                    z = 0;
                    aa = ga;
                    var ia = w(v());
                    if (v() != "$") u();
                    z = aa = null;
                    return ha && g.call(ha) == "[object Function]" ? x((ba = {}, ba[""] = iglobal, ba), "", ha) : ia;
                };
            }
        }
    }).call(this);
});