( function ( root, factory ) {
    if ( typeof define === 'function' && define.amd ) {
        define( factory );
    } else {
        root.Porthole = factory();
    }
}( this, function () {
/**
 * almond 0.2.6 Copyright (c) 2011-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);

                name = baseParts.concat(name.split("/"));

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (typeof callback === 'function') {

            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback.apply(defined[name], args);

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        config = cfg;
        if (config.deps) {
            req(config.deps, config.callback);
        }
        return req;
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

define("../build/almond", function(){});

define( 'Log', ['require'],function ( require ) {
	'use strict';

	var Log = {
		/**
		 * Utility function to trace to console
		 * @private
		 */
		trace: function(s) {
			if (window['console'] !== undefined) {
				window.console.log('Porthole: ' + s);
			}
		},

		/**
		 * Utility function to send errors to console
		 * @private
		 */
		error: function(s) {
			if (window['console'] !== undefined) {
				window.console.error('Porthole: ' + s);
			}
		}
	};

	return Log;
} );
define( 'Class', ['require'],function ( require ) {

	var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

	// The base Class implementation (does nothing)
	var Class = function(){};

	// Create a new Class that inherits from this class
	Class.extend = function(prop) {
		var _super = this.prototype;

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;

		// Copy the properties over onto the new prototype
		for (var name in prop) {
			// Check if we're overwriting an existing function
			prototype[name] = typeof prop[name] == "function" &&
			typeof _super[name] == "function" && fnTest.test(prop[name]) ?
			(function(name, fn){
			  return function() {
				var tmp = this._super;

				// Add a new ._super() method that is the same method
				// but on the super-class
				this._super = _super[name];

				// The method only need to be bound temporarily, so we
				// remove it when we're done executing
				var ret = fn.apply(this, arguments);
				this._super = tmp;

				return ret;
			  };
			})(name, prop[name]) :
			prop[name];
		}

		// The dummy class constructor
		function Class() {
		  // All construction is actually done in the init method
		  if ( !initializing && this.init )
			this.init.apply(this, arguments);
		}

		// Populate our constructed prototype object
		Class.prototype = prototype;

		// Enforce the constructor to be what we expect
		Class.prototype.constructor = Class;

		// And make this class extendable
		Class.extend = arguments.callee;

		return Class;
	};

	return Class;
} );
/*! JSON v3.2.5 | http://bestiejs.github.io/json3 | Copyright 2012-2013, Kit Cambridge | http://kit.mit-license.org */
;(function(){var o=!0,w=null;
(function(A){function u(a){if("bug-string-char-index"==a)return"a"!="a"[0];var f,c="json"==a;if(c||"json-stringify"==a||"json-parse"==a){if("json-stringify"==a||c){var e=k.stringify,b="function"==typeof e&&l;if(b){(f=function(){return 1}).toJSON=f;try{b="0"===e(0)&&"0"===e(new Number)&&'""'==e(new String)&&e(m)===r&&e(r)===r&&e()===r&&"1"===e(f)&&"[1]"==e([f])&&"[null]"==e([r])&&"null"==e(w)&&"[null,null,null]"==e([r,m,w])&&'{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}'==e({a:[f,o,!1,w,"\x00\u0008\n\u000c\r\t"]})&&
"1"===e(w,f)&&"[\n 1,\n 2\n]"==e([1,2],w,1)&&'"-271821-04-20T00:00:00.000Z"'==e(new Date(-864E13))&&'"+275760-09-13T00:00:00.000Z"'==e(new Date(864E13))&&'"-000001-01-01T00:00:00.000Z"'==e(new Date(-621987552E5))&&'"1969-12-31T23:59:59.999Z"'==e(new Date(-1))}catch(n){b=!1}}if(!c)return b}if("json-parse"==a||c){a=k.parse;if("function"==typeof a)try{if(0===a("0")&&!a(!1)){f=a('{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}');var d=5==f.a.length&&1===f.a[0];if(d){try{d=!a('"\t"')}catch(g){}if(d)try{d=
1!==a("01")}catch(i){}}}}catch(N){d=!1}if(!c)return d}return b&&d}}var m={}.toString,p,B,r,C=typeof define==="function"&&define.amd,k="object"==typeof exports&&exports;k||C?"object"==typeof JSON&&JSON?k?(k.stringify=JSON.stringify,k.parse=JSON.parse):k=JSON:C&&(k=A.JSON={}):k=A.JSON||(A.JSON={});var l=new Date(-3509827334573292);try{l=-109252==l.getUTCFullYear()&&0===l.getUTCMonth()&&1===l.getUTCDate()&&10==l.getUTCHours()&&37==l.getUTCMinutes()&&6==l.getUTCSeconds()&&708==l.getUTCMilliseconds()}catch(O){}if(!u("json")){var D=
u("bug-string-char-index");if(!l)var s=Math.floor,J=[0,31,59,90,120,151,181,212,243,273,304,334],z=function(a,f){return J[f]+365*(a-1970)+s((a-1969+(f=+(f>1)))/4)-s((a-1901+f)/100)+s((a-1601+f)/400)};if(!(p={}.hasOwnProperty))p=function(a){var f={},c;if((f.__proto__=w,f.__proto__={toString:1},f).toString!=m)p=function(a){var f=this.__proto__,a=a in(this.__proto__=w,this);this.__proto__=f;return a};else{c=f.constructor;p=function(a){var f=(this.constructor||c).prototype;return a in this&&!(a in f&&
this[a]===f[a])}}f=w;return p.call(this,a)};B=function(a,f){var c=0,b,h,n;(b=function(){this.valueOf=0}).prototype.valueOf=0;h=new b;for(n in h)p.call(h,n)&&c++;b=h=w;if(c)c=c==2?function(a,f){var c={},b=m.call(a)=="[object Function]",e;for(e in a)!(b&&e=="prototype")&&!p.call(c,e)&&(c[e]=1)&&p.call(a,e)&&f(e)}:function(a,f){var c=m.call(a)=="[object Function]",b,e;for(b in a)!(c&&b=="prototype")&&p.call(a,b)&&!(e=b==="constructor")&&f(b);(e||p.call(a,b="constructor"))&&f(b)};else{h=["valueOf","toString",
"toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"];c=function(a,f){var c=m.call(a)=="[object Function]",b;for(b in a)!(c&&b=="prototype")&&p.call(a,b)&&f(b);for(c=h.length;b=h[--c];p.call(a,b)&&f(b));}}c(a,f)};if(!u("json-stringify")){var K={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"},t=function(a,f){return("000000"+(f||0)).slice(-a)},G=function(a){var f='"',b=0,e=a.length,h=e>10&&D,n;for(h&&(n=a.split(""));b<e;b++){var d=a.charCodeAt(b);switch(d){case 8:case 9:case 10:case 12:case 13:case 34:case 92:f=
f+K[d];break;default:if(d<32){f=f+("\\u00"+t(2,d.toString(16)));break}f=f+(h?n[b]:D?a.charAt(b):a[b])}}return f+'"'},E=function(a,b,c,e,h,n,d){var g=b[a],i,j,k,l,q,u,v,x,y;try{g=b[a]}catch(A){}if(typeof g=="object"&&g){i=m.call(g);if(i=="[object Date]"&&!p.call(g,"toJSON"))if(g>-1/0&&g<1/0){if(z){k=s(g/864E5);for(i=s(k/365.2425)+1970-1;z(i+1,0)<=k;i++);for(j=s((k-z(i,0))/30.42);z(i,j+1)<=k;j++);k=1+k-z(i,j);l=(g%864E5+864E5)%864E5;q=s(l/36E5)%24;u=s(l/6E4)%60;v=s(l/1E3)%60;l=l%1E3}else{i=g.getUTCFullYear();
j=g.getUTCMonth();k=g.getUTCDate();q=g.getUTCHours();u=g.getUTCMinutes();v=g.getUTCSeconds();l=g.getUTCMilliseconds()}g=(i<=0||i>=1E4?(i<0?"-":"+")+t(6,i<0?-i:i):t(4,i))+"-"+t(2,j+1)+"-"+t(2,k)+"T"+t(2,q)+":"+t(2,u)+":"+t(2,v)+"."+t(3,l)+"Z"}else g=w;else if(typeof g.toJSON=="function"&&(i!="[object Number]"&&i!="[object String]"&&i!="[object Array]"||p.call(g,"toJSON")))g=g.toJSON(a)}c&&(g=c.call(b,a,g));if(g===w)return"null";i=m.call(g);if(i=="[object Boolean]")return""+g;if(i=="[object Number]")return g>
-1/0&&g<1/0?""+g:"null";if(i=="[object String]")return G(g);if(typeof g=="object"){for(a=d.length;a--;)if(d[a]===g)throw TypeError();d.push(g);x=[];b=n;n=n+h;if(i=="[object Array]"){j=0;for(a=g.length;j<a;y||(y=o),j++){i=E(j,g,c,e,h,n,d);x.push(i===r?"null":i)}a=y?h?"[\n"+n+x.join(",\n"+n)+"\n"+b+"]":"["+x.join(",")+"]":"[]"}else{B(e||g,function(a){var b=E(a,g,c,e,h,n,d);b!==r&&x.push(G(a)+":"+(h?" ":"")+b);y||(y=o)});a=y?h?"{\n"+n+x.join(",\n"+n)+"\n"+b+"}":"{"+x.join(",")+"}":"{}"}d.pop();return a}};
k.stringify=function(a,b,c){var e,h,j;if(typeof b=="function"||typeof b=="object"&&b)if(m.call(b)=="[object Function]")h=b;else if(m.call(b)=="[object Array]"){j={};for(var d=0,g=b.length,i;d<g;i=b[d++],(m.call(i)=="[object String]"||m.call(i)=="[object Number]")&&(j[i]=1));}if(c)if(m.call(c)=="[object Number]"){if((c=c-c%1)>0){e="";for(c>10&&(c=10);e.length<c;e=e+" ");}}else m.call(c)=="[object String]"&&(e=c.length<=10?c:c.slice(0,10));return E("",(i={},i[""]=a,i),h,j,e,"",[])}}if(!u("json-parse")){var L=
String.fromCharCode,M={92:"\\",34:'"',47:"/",98:"\u0008",116:"\t",110:"\n",102:"\u000c",114:"\r"},b,v,j=function(){b=v=w;throw SyntaxError();},q=function(){for(var a=v,f=a.length,c,e,h,k,d;b<f;){d=a.charCodeAt(b);switch(d){case 9:case 10:case 13:case 32:b++;break;case 123:case 125:case 91:case 93:case 58:case 44:c=D?a.charAt(b):a[b];b++;return c;case 34:c="@";for(b++;b<f;){d=a.charCodeAt(b);if(d<32)j();else if(d==92){d=a.charCodeAt(++b);switch(d){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:c=
c+M[d];b++;break;case 117:e=++b;for(h=b+4;b<h;b++){d=a.charCodeAt(b);d>=48&&d<=57||d>=97&&d<=102||d>=65&&d<=70||j()}c=c+L("0x"+a.slice(e,b));break;default:j()}}else{if(d==34)break;d=a.charCodeAt(b);for(e=b;d>=32&&d!=92&&d!=34;)d=a.charCodeAt(++b);c=c+a.slice(e,b)}}if(a.charCodeAt(b)==34){b++;return c}j();default:e=b;if(d==45){k=o;d=a.charCodeAt(++b)}if(d>=48&&d<=57){for(d==48&&(d=a.charCodeAt(b+1),d>=48&&d<=57)&&j();b<f&&(d=a.charCodeAt(b),d>=48&&d<=57);b++);if(a.charCodeAt(b)==46){for(h=++b;h<f&&
(d=a.charCodeAt(h),d>=48&&d<=57);h++);h==b&&j();b=h}d=a.charCodeAt(b);if(d==101||d==69){d=a.charCodeAt(++b);(d==43||d==45)&&b++;for(h=b;h<f&&(d=a.charCodeAt(h),d>=48&&d<=57);h++);h==b&&j();b=h}return+a.slice(e,b)}k&&j();if(a.slice(b,b+4)=="true"){b=b+4;return o}if(a.slice(b,b+5)=="false"){b=b+5;return false}if(a.slice(b,b+4)=="null"){b=b+4;return w}j()}}return"$"},F=function(a){var b,c;a=="$"&&j();if(typeof a=="string"){if(a[0]=="@")return a.slice(1);if(a=="["){for(b=[];;c||(c=o)){a=q();if(a=="]")break;
if(c)if(a==","){a=q();a=="]"&&j()}else j();a==","&&j();b.push(F(a))}return b}if(a=="{"){for(b={};;c||(c=o)){a=q();if(a=="}")break;if(c)if(a==","){a=q();a=="}"&&j()}else j();(a==","||typeof a!="string"||a[0]!="@"||q()!=":")&&j();b[a.slice(1)]=F(q())}return b}j()}return a},I=function(a,b,c){c=H(a,b,c);c===r?delete a[b]:a[b]=c},H=function(a,b,c){var e=a[b],h;if(typeof e=="object"&&e)if(m.call(e)=="[object Array]")for(h=e.length;h--;)I(e,h,c);else B(e,function(a){I(e,a,c)});return c.call(a,b,e)};k.parse=
function(a,f){var c,e;b=0;v=""+a;c=F(q());q()!="$"&&j();b=v=w;return f&&m.call(f)=="[object Function]"?H((e={},e[""]=c,e),"",f):c}}}C&&define('JSON',[],function(){return k})})(this);
}());
define( 'WindowProxyBase', ['require','Class','JSON'],function ( require ) {
    'use strict';

    var Class = require( 'Class' );
    var JSON  = require( 'JSON' );

    var WindowProxyBase = Class.extend({
        init: function(targetWindowName) {
            if (targetWindowName === undefined) {
                targetWindowName = '';
            }
            this.targetWindowName = targetWindowName;
            this.origin = window.location.protocol + '//' + window.location.host;
            this.eventListeners = [];
        },

        getTargetWindowName: function() {
            return this.targetWindowName;
        },

        getOrigin: function() {
            return this.origin;
        },

        /**
         * Lookup window object based on target window name
         * @private
         * @return {string} targetWindow
         */
        getTargetWindow: function() {
            return this._getTargetWindow(this.targetWindowName);
        },

        post: function(data, targetOrigin) {
            if (targetOrigin === undefined) {
                targetOrigin = '*';
            }
            this.dispatchMessage({
                'data' : data,
                'sourceOrigin' : this.getOrigin(),
                'targetOrigin' : targetOrigin,
                'sourceWindowName' : window.name,
                'targetWindowName' : this.getTargetWindowName()
            });
        },

        addEventListener: function(f) {
            this.eventListeners.push(f);
            return f;
        },

        removeEventListener: function(f) {
            var index;
            try {
                index = this.eventListeners.indexOf(f);
                this.eventListeners.splice(index, 1);
            } catch(e) {
                this.eventListeners = [];
            }
        },

        dispatchEvent: function(event) {
            var i;
            for (i = 0; i < this.eventListeners.length; i++) {
                //try {
                    this.eventListeners[i](event);
                //} catch(e) {
                //}
            }
        },


        /**
         * Serialize an object using JSON.stringify
         *
         * @param {Object} obj The object to be serialized
         * @return {String}
         */
        serialize: function(obj) {
            if (typeof JSON === 'undefined') {
                throw new Error('Porthole serialization depends on JSON!');
            }

            return JSON.stringify(obj);
        },

        /**
         * Unserialize using JSON.parse
         *
         * @param {String} text Serialization
         * @return {Object}
         */
        unserialize: function(text) {
            if (typeof JSON === 'undefined') {
                throw new Error('Porthole unserialization dependens on JSON!');
            }
            try {
                var json = JSON.parse(text);
                return json;
            } catch (e) {
                return false;
            }
        },

        _getTargetWindow: function(targetWindowName) {
            if (targetWindowName === '') {
                return top;
            } else if (targetWindowName === 'top' || targetWindowName === 'parent') {
                return window[targetWindowName];
            }
            return parent.frames[targetWindowName];
        }
    });

    return WindowProxyBase;
});

    /**
     * @class
     * @classdesc Proxy window object to post message to target window
     * @param {string} proxyIFrameUrl - Fully qualified url to proxy iframe
     * @param {string} targetWindowName - Name of the proxy iframe window
     */

define( 'WindowProxy', ['require'],function ( require ) {
	'use strict';

	var WindowProxy = function(){};

    WindowProxy.prototype = {
        /**
         * Post a message to the target window only if the content comes from the target origin.
         * <code>targetOrigin</code> can be a url or *
         * @public
         * @param {Object} data - Payload
         * @param {String} targetOrigin
         */
        post: function(data, targetOrigin) {},
        /**
         * Add an event listener to receive messages.
         * @public
         * @param {Function} eventListenerCallback
         * @returns {Function} eventListenerCallback
         */
        addEventListener: function(f) {},
        /**
         * Remove an event listener.
         * @public
         * @param {Function} eventListenerCallback
         */
        removeEventListener: function(f) {}

    };

	return WindowProxy;
} );
/**
 * Legacy browser implementation of proxy window object to post message to target window
 *
 * @private
 * @constructor
 * @param {string} proxyIFrameUrl - Fully qualified url to proxy iframe, or null to create a receiver only window
 * @param {string} targetWindowName - Name of the proxy iframe window
 */
define( 'WindowProxyLegacy', ['require','WindowProxyBase','Log','WindowProxy'],function ( require ) {
	'use strict';

	var WindowProxyBase = require( 'WindowProxyBase' );
	var Log             = require( 'Log' );
	var WindowProxy     = require( 'WindowProxy' );

	var WindowProxyLegacy = WindowProxyBase.extend({
        init: function(proxyIFrameUrl, targetWindowName) {
            this._super(targetWindowName);

            if (proxyIFrameUrl !== null) {
                this.proxyIFrameName = this.targetWindowName + 'ProxyIFrame';
                this.proxyIFrameLocation = proxyIFrameUrl;

                // Create the proxy iFrame and add to dom
                this.proxyIFrameElement = this.createIFrameProxy();
            } else {
                // Won't be able to send messages
                this.proxyIFrameElement = null;
                Log.trace("proxyIFrameUrl is null, window will be a receiver only");
                this.post = function(){ throw new Error("Receiver only window");};
                //throw  new Error("proxyIFrameUrl can't be null");
            }
        },

        /**
         * Create an iframe and load the proxy
         *
         * @private
         * @returns iframe
         */
        createIFrameProxy: function() {
            var iframe = document.createElement('iframe');

            iframe.setAttribute('id', this.proxyIFrameName);
            iframe.setAttribute('name', this.proxyIFrameName);
            iframe.setAttribute('src', this.proxyIFrameLocation);
            // IE needs this otherwise resize event is not fired
            iframe.setAttribute('frameBorder', '1');
            iframe.setAttribute('scrolling', 'auto');
            // Need a certain size otherwise IE7 does not fire resize event
            iframe.setAttribute('width', 30);
            iframe.setAttribute('height', 30);
            iframe.setAttribute('style', 'position: absolute; left: -100px; top:0px;');
            // IE needs this because setting style attribute is broken. No really.
            if (iframe.style.setAttribute) {
                iframe.style.setAttribute('cssText', 'position: absolute; left: -100px; top:0px;');
            }
            document.body.appendChild(iframe);
            return iframe;
        },

        dispatchMessage: function(message) {
            var encode = window.encodeURIComponent;

            if (this.proxyIFrameElement) {
                var src = this.proxyIFrameLocation + '#' + encode(WindowProxy.serialize(message));
                this.proxyIFrameElement.setAttribute('src', src);
                this.proxyIFrameElement.height = this.proxyIFrameElement.height > 50 ? 50 : 100;
            }
        }
    });

	return WindowProxyLegacy;
} );
/**
 * @classdesc Event object to be passed to registered event handlers
 * @class
 * @param {String} data
 * @param {String} origin - url of window sending the message
 * @param {Object} source - window object sending the message
 */
define( 'MessageEvent', ['require'],function ( require ) {
	'use strict';

	var MessageEvent = function (data, origin, source) {
		this.data = data;
		this.origin = origin;
		this.source = source;
	};

	return MessageEvent;
} );
/**
 * Implementation for modern browsers that supports it
 */
define( 'WindowProxyHTML5', ['require','WindowProxyBase','MessageEvent'],function ( require ) {
	'use strict';

	var WindowProxyBase = require( 'WindowProxyBase' );
	// var WindowProxy     = require( 'WindowProxy' );
	var MessageEvent    = require( 'MessageEvent' );

	var WindowProxyHTML5 = WindowProxyBase.extend({
		init: function(proxyIFrameUrl, targetWindowName) {
			this._super(targetWindowName);
			this.eventListenerCallback = null;
		},

		dispatchMessage: function(message) {
			this.getTargetWindow().postMessage(this.serialize(message), message.targetOrigin);
		},

		addEventListener: function(f) {
			if (this.eventListeners.length === 0) {
				var self = this;
				if (window.addEventListener) {
					this.eventListenerCallback = function(event) { self.eventListener(self, event); };
					window.addEventListener('message', this.eventListenerCallback, false);
				} else if (window.attachEvent) {
				// Make IE8 happy, just not that 1. postMessage only works for IFRAMES/FRAMES http://blogs.msdn.com/b/ieinternals/archive/2009/09/16/bugs-in-ie8-support-for-html5-postmessage-sessionstorage-and-localstorage.aspx
					this.eventListenerCallback = function(event) { self.eventListener(self, window.event); };
					window.attachEvent('onmessage', this.eventListenerCallback);
				}
			}
			return this._super(f);
		},

		removeEventListener: function(f) {
			this._super(f);

			if (this.eventListeners.length === 0) {
				if (window.removeEventListener) {
					window.removeEventListener('message', this.eventListenerCallback);
				} else if (window.detachEvent) { // Make IE8, happy, see above
					// see jquery, detachEvent needed property on element, by name of that event, to properly expose it to GC
					if (typeof window.onmessage === 'undefined') window.onmessage = null;
					window.detachEvent('onmessage', this.eventListenerCallback);
				}
				this.eventListenerCallback = null;
			}
		},

		eventListener: function(self, nativeEvent) {
			var data = this.unserialize(nativeEvent.data);
			if (data && (self.targetWindowName == '' || data.sourceWindowName == self.targetWindowName)) {
				self.dispatchEvent(new MessageEvent(data.data, nativeEvent.origin, self));
			}
		}
	});

	return WindowProxyHTML5;
} );
/*
	Copyright (c) 2011-2012 Ternary Labs. All Rights Reserved.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/
define( 'main', ['require','Log','WindowProxyLegacy','WindowProxyHTML5'],function ( require ) {
	'use strict';

	/**
	 * @overview Porthole, JavaScript Library for Secure Cross Domain iFrame Communication.
	 * @author <a href="mailto:georges@ternarylabs.com">Georges Auberger</a>
	 * @copyright 2011-2012 Ternary Labs, All Rights Reserved.
	 *
	 * Namespace for Porthole
	 * @module Porthole
	 */

	var Log = require( 'Log' );
	var Porthole = {
		'trace'             : Log.trace,
		'error'             : Log.error,
		'WindowProxyLegacy' : require( 'WindowProxyLegacy' ),
		'WindowProxyHTML5'  : require( 'WindowProxyHTML5' )
	};

	if (!window.postMessage) {
		Porthole.trace('Using legacy browser support');
		Porthole.WindowProxy = Porthole.WindowProxyLegacy.extend({});
	} else {
		Porthole.trace('Using built-in browser support');
		Porthole.WindowProxy = Porthole.WindowProxyHTML5.extend({});
	}


	// // Support testing in node.js:
	// if (typeof window.exports !== 'undefined') {
	// 	window.exports.Porthole = Porthole;
	// } else {
	// 	window.Porthole = Porthole;
	// }

	return Porthole;
});
    return require( 'main' );
} ) );