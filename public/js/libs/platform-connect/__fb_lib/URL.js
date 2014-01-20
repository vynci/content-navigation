define('URL', function(require) {
    var g = require('Assert'),
        h = require('copyProperties'),
        i = require('QueryString'),
        j = require('Log'),
        k = new RegExp('(' + '(((\\w+):)?//)' + '(.*?@)?' + '([^~/?#:]+)' + '(:(\\d+))?' + ')?' + '([^\\?$#]+)?' + '(\\?([^$#]+))?' + '(#([^$]+))?'),
        l = /[\0\\]/,
        m = /[^\w\-\.,; \/?:@=&%#$~+!*'\[\]()]+/g,
        n = /^[a-z0-9.][a-z0-9\-\.]+[a-z0-9.]$/,
        o = /\.facebook\.com$/;

    function p(q) {
        g.isString(q, 'The passed argument was of invalid type.');
        if (l.test(q)) throw new URIError('The passed argument could not be parsed as a url.');
        if (this instanceof p === false) return new p(q);
        var r = q.replace(m, function(t) {
            j.warn('Escaping unescaped character \\x%s from "%s"', t.charCodeAt(0).toString(16), q);
            return encodeURIComponent(t);
        }).match(k);
        if (!q || !r) throw new URIError('The passed argument could not be parsed as a url.');
        var s = !! location.hostname;
        this.setProtocol(r[4] || (s ? location.protocol.replace(/:/, '') : ''));
        this.setDomain(r[6] || location.hostname);
        this.setPort(r[8] || (s && !r[6] ? location.port : ''));
        this.setPath(r[9] || '');
        this.setSearch(r[11] || '');
        this.setFragment(r[13] || '');
        if (this._path.substring(0, 1) != '/') this._path = '/' + this._path;
        if (this._domain && !n.test(decodeURIComponent(this._domain.toLowerCase()))) {
            j.error('Invalid characters found in domain name: %s', this._domain);
            throw new URIError('Domain contained invalid characters.');
        }
    }
    h(p.prototype, {
        constructor: p,
        getProtocol: function() {
            return this._protocol;
        },
        setProtocol: function(q) {
            this._protocol = q;
            return this;
        },
        getDomain: function() {
            return this._domain;
        },
        setDomain: function(q) {
            this._domain = q;
            return this;
        },
        getPort: function() {
            return this._port;
        },
        setPort: function(q) {
            this._port = q;
            return this;
        },
        getPath: function() {
            return this._path;
        },
        setPath: function(q) {
            this._path = q;
            return this;
        },
        getSearch: function() {
            return this._search;
        },
        setSearch: function(q) {
            this._search = q;
            return this;
        },
        getFragment: function() {
            return this._fragment;
        },
        setFragment: function(q) {
            this._fragment = q;
            return this;
        },
        getParsedSearch: function() {
            return i.decode(this._search);
        },
        getParsedFragment: function() {
            return i.decode(this._fragment);
        },
        isFacebookURL: function() {
            return o.test(this._domain);
        },
        toString: function() {
            return (this._protocol ? this._protocol + ':' : '') + (this._domain ? '//' + this._domain : '') + (this._port ? ':' + this._port : '') + this._path + (this._search ? '?' + this._search : '') + (this._fragment ? '#' + this._fragment : '');
        },
        valueOf: function() {
            return this.toString();
        }
    });
    h(p, {
        getCurrent: function() {
            return new p(location.href);
        },
        getReferrer: function() {
            return document.referrer ? new p(document.referrer) : null;
        }
    });
    module.exports = p;
});