define( 'sdk.Runtime', function ( require ) {
            var g = require('sdk.Model'),
                h = require('sdk.RuntimeConfig'),
                i = require('copyProperties'),
                j = {
                    UNKNOWN: 0,
                    PAGETAB: 1,
                    CANVAS: 2,
                    PLATFORM: 4
                }, k = new g({
                    AccessToken: '',
                    ClientID: '',
                    Environment: j.UNKNOWN,
                    Initialized: false,
                    KidDirectedSite: undefined,
                    Locale: h.locale,
                    LoginStatus: undefined,
                    Rtl: h.rtl,
                    Scope: undefined,
                    Secure: undefined,
                    UseCookie: false,
                    UserID: '',
                    CookieUserID: ''
                });
            i(k, {
                ENVIRONMENTS: j,
                isEnvironment: function (l) {
                    var m = this.getEnvironment();
                    return (l | m) === m;
                }
            });
            (function () {
                var l = /app_runner/.test(window.name) ? j.PAGETAB : /iframe_canvas/.test(window.name) ? j.CANVAS : j.UNKNOWN;
                if ((l | j.PAGETAB) === l) l = l | j.CANVAS;
                k.setEnvironment(l);
            })();
            module.exports = k;
        });