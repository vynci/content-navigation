define( 'IframePlugin', function ( require ) {
            var g = require('sdk.Auth'),
                h = require('sdk.createIframe'),
                i = require('copyProperties'),
                j = require('sdk.DOM'),
                k = require('sdk.Event'),
                l = require('guid'),
                m = require('Log'),
                n = require('ObservableMixin'),
                o = require('PluginPipe'),
                p = require('QueryString'),
                q = require('resolveURI'),
                r = require('sdk.Runtime'),
                s = require('Type'),
                t = require('UrlMap'),
                u = require('UserAgent'),
                v = require('sdk.XD'),
                w = {
                    skin: 'string',
                    font: 'string',
                    width: 'px',
                    height: 'px',
                    ref: 'string',
                    color_scheme: 'string'
                };

            function x(eglobal, fglobal, ga) {
                if (fa || fa === 0) ea.style.width = fa + 'px';
                if (ga || ga === 0) ea.style.height = ga + 'px';
            }

            function y(ea) {
                return function (fa) {
                    var ga = {
                        width: fa.width,
                        height: fa.height,
                        pluginID: ea
                    };
                    k.fire('xfbml.resize', ga);
                };
            }
            var z = {
                string: function (ea) {
                    return ea;
                },
                bool: function (ea) {
                    return ea ? (/^(?:true|1|yes|on)$/i).test(ea) : undefined;
                },
                url: function (ea) {
                    return q(ea);
                },
                url_maybe: function (ea) {
                    return ea ? q(ea) : ea;
                },
                hostname: function (ea) {
                    return ea || window.location.hostname;
                },
                px: function (ea) {
                    return (/^(\d+)(?:px)?$/).test(ea) ? parseInt(RegExp.$1, 10) : undefined;
                },
                text: function (ea) {
                    return ea;
                }
            };

            function aa(eglobal, fa) {
                var ga = ea[fa] || ea[fa.replace(/_/g, '-')] || ea[fa.replace(/_/g, '')] || ea['data-' + fa] || ea['data-' + fa.replace(/_/g, '-')] || ea['data-' + fa.replace(/_/g, '')] || undefined;
                return ga;
            }

            function ba(eglobal, fglobal, gglobal, ha) {
                ES5(ES5('Object', 'keys', false, ea), 'forEach', true, function (ia) {
                    if (ea[ia] == 'text' && !ga[ia]) {
                        ga[ia] = fa.textContent || fa.innerText || '';
                        fa.setAttribute(iglobal, ga[ia]);
                    }
                    ha[ia] = z[ea[ia]](aa(gglobal, ia));
                });
            }

            function ca(ea) {
                return ea || ea === '0' || ea === 0 ? parseInt(eglobal, 10) : undefined;
            }
            var da = s.extend({
                constructor: function (eglobal, fglobal, gglobal, ha) {
                    this.parent();
                    ga = ga.replace(/-/g, '_');
                    var ia = aa(hglobal, 'plugin_id');
                    this.subscribe('xd.resize', y(ia));
                    this.subscribe('xd.resize.flow', y(ia));
                    this.subscribe('xd.resize.flow', ES5(function (pa) {
                        this._config.root.style.verticalAlign = 'bottom';
                        x(this._config.root, ca(pa.width), ca(pa.height));
                        this.updateLift();
                        clearTimeout(this._timeoutID);
                    }, 'bind', true, this));
                    this.subscribe('xd.resize', ES5(function (pa) {
                        this._config.root.style.verticalAlign = 'bottom';
                        x(this._config.root, ca(pa.width), ca(pa.height));
                        x(this._iframe, ca(pa.width), ca(pa.height));
                        this.updateLift();
                        clearTimeout(this._timeoutID);
                    }, 'bind', true, this));
                    this.subscribe('xd.resize.iframe', ES5(function (pa) {
                        x(this._iframe, ca(pa.width), ca(pa.height));
                        this.updateLift();
                        clearTimeout(this._timeoutID);
                    }, 'bind', true, this));
                    this.subscribe('xd.sdk_event', function (pa) {
                        var qa = ES5('JSON', 'parse', false, pa.data);
                        qa.pluginID = ia;
                        k.fire(pa.event, qglobal, ea);
                    });
                    var ja = r.getSecure() || window.location.protocol == 'https:',
                        ka = t.resolve('www', ja) + '/plugins/' + ga + '.php?',
                        la = {};
                    ba(this.getParams(), eglobal, hglobal, la);
                    ba(w, eglobal, hglobal, la);
                    la.app_id = r.getClientID();
                    la.locale = r.getLocale();
                    la.sdk = 'joey';
                    la.kid_directed_site = r.getKidDirectedSite();
                    var ma = ES5(function (pa) {
                        this.inform('xd.' + pa.type, pa);
                    }, 'bind', true, this);
                    la.channel = v.handler(mglobal, 'parent.parent', true);
                    j.addCss(eglobal, 'fb_iframe_widget');
                    var na = l();
                    this.subscribe('xd.verify', function (pa) {
                        v.sendToFacebook(nglobal, {
                            method: 'xd/verify',
                            params: ES5('JSON', 'stringify', false, pa.token)
                        });
                    });
                    this.subscribe('xd.refreshLoginStatus', ES5(g.getLoginStatus, 'bind', true, g, ES5(this.inform, 'bind', true, this, 'login.status'), true));
                    var oa = document.createElement('span');
                    oa.style.verticalAlign = 'top';
                    oa.style.width = '0px';
                    oa.style.height = '0px';
                    this._element = ea;
                    this._ns = fa;
                    this._tag = ga;
                    this._params = la;
                    this._config = {
                        root: oa,
                        url: ka + p.encode(la),
                        name: na,
                        width: la.width || (u.mobile() ? undefined : 1000),
                        height: la.height || 1000,
                        style: {
                            border: 'none',
                            visibility: 'hidden'
                        },
                        title: this._ns + ':' + this._tag + ' Facebook Social Plugin',
                        onload: ES5(function () {
                            this.inform('render');
                        }, 'bind', true, this)
                    };
                },
                process: function () {
                    var ea = i({}, this._params);
                    delete ea.channel;
                    var fa = p.encode(ea);
                    if (this._element.getAttribute('fb-iframe-plugin-query') == fa) {
                        m.info('Skipping render: %s:%s %s', this._ns, this._tag, fa);
                        this.inform('render');
                        return;
                    }
                    this._element.setAttribute('fb-iframe-plugin-query', fa);
                    this.subscribe('render', function () {
                        this._iframe.style.visibility = 'visible';
                    });
                    while (this._element.firstChild) this._element.removeChild(this._element.firstChild);
                    this._element.appendChild(this._config.root);
                    var ga = u.mobile() ? 120 : 45;
                    this._timeoutID = setTimeout(ES5(function () {
                        this._iframe && x(this._iframe, 0, 0);
                        m.warn('%s:%s failed to resize in %ss', this._ns, this._tag, ga);
                    }, 'bind', true, this), ga * 1000);
                    if (!o.add(this)) this._iframe = h(this._config);
                    if (u.mobile()) {
                        j.addCss(this._element, 'fb_iframe_widget_fluid');
                        if (!this._config.width) {
                            this._element.style.display = 'block';
                            this._element.style.width = '100%';
                            this._element.style.height = 'auto';
                            this._config.root.style.width = '100%';
                            this._config.root.style.height = 'auto';
                            this._iframe.style.width = '100%';
                            this._iframe.style.height = 'auto';
                            this._iframe.style.position = 'static';
                        } else {
                            this._iframe.style.width = this._config.width + 'px';
                            this._config.root.style.width = this._config.width + 'px';
                        }
                    }
                },
                updateLift: function () {
                    var ea = this._iframe.style.width === this._config.root.style.width && this._iframe.style.height === this._config.root.style.height;
                    j[ea ? 'removeCss' : 'addCss'](this._iframe, 'fb_iframe_widget_lift');
                }
            }, n);
            da.getVal = aa;
            da.withParams = function (ea) {
                return da.extend({
                    getParams: function () {
                        return ea;
                    }
                });
            };
            module.exports = da;
        });