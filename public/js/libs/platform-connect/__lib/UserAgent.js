define( 'UserAgent', function ( require ) {
    var g = false,
        h, i, j, k, l, m, n, o, p, q, r, s, t, u;

    function v() {
        if (g) return;
        g = true;
        var x = navigator.userAgent,
            y = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(x),
            z = /(Mac OS X)|(Windows)|(Linux)/.exec(x);
        r = /\b(iPhone|iP[ao]d)/.exec(x);
        s = /\b(iP[ao]d)/.exec(x);
        p = /Android/i.exec(x);
        t = /FBAN\/\w+; /i.exec(x);
        u = /Mobile/i.exec(x);
        q = !! (/Win64/.exec(x));
        if (y) {
            h = y[1] ? parseFloat(y[1]) : (y[5] ? parseFloat(y[5]) : NaN);
            if (h && document.documentMode) h = document.documentMode;
            i = y[2] ? parseFloat(y[2]) : NaN;
            j = y[3] ? parseFloat(y[3]) : NaN;
            k = y[4] ? parseFloat(y[4]) : NaN;
            if (k) {
                y = /(?:Chrome\/(\d+\.\d+))/.exec(x);
                l = y && y[1] ? parseFloat(y[1]) : NaN;
            } else l = NaN;
        } else h = i = j = l = k = NaN; if (z) {
            if (z[1]) {
                var aa = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(x);
                m = aa ? parseFloat(aa[1].replace('_', '.')) : true;
            } else m = false;
            n = !! z[2];
            o = !! z[3];
        } else m = n = o = false;
    }
    var w = {
        ie: function() {
            return v() || h;
        },
        ie64: function() {
            return w.ie() && q;
        },
        firefox: function() {
            return v() || i;
        },
        opera: function() {
            return v() || j;
        },
        webkit: function() {
            return v() || k;
        },
        safari: function() {
            return w.webkit();
        },
        chrome: function() {
            return v() || l;
        },
        windows: function() {
            return v() || n;
        },
        osx: function() {
            return v() || m;
        },
        linux: function() {
            return v() || o;
        },
        iphone: function() {
            return v() || r;
        },
        mobile: function() {
            return v() || (r || s || p || u);
        },
        nativeApp: function() {
            return v() || t;
        },
        android: function() {
            return v() || p;
        },
        ipad: function() {
            return v() || s;
        }
    };
    return w;
});