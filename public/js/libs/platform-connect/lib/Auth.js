define( 'Auth', function ( require ) {
	'use strict';

	var _ = require( 'lodash' );
	var $ = require( 'jquery' );

	var guid          = require( 'guid' );
	var Runtime       = require( 'Runtime' );
	var EventEmitter  = require( 'EventEmitter' );
	var createIframe  = require( 'createIframe' );
	var QueryString   = require( 'QueryString' );
	var SignedRequest = require( 'SignedRequest' );
	var Cookie        = require( 'Cookie' );

	var Observable   = require( 'Observable' );

	// EventEmitter.subscribe( 'logout', ES5(h.fire, 'bind', true, h, 'auth.logout' ) );
	// EventEmitter.subscribe( 'login', ES5(h.fire, 'bind', true, h, 'auth.login' ) );
	// EventEmitter.subscribe( 'authresponse.change', ES5(h.fire, 'bind', true, h, 'auth.authResponseChange' ) );
	// EventEmitter.subscribe( 'status.change', ES5(h.fire, 'bind', true, h, 'auth.statusChange' ) );

	var _authResponse;
	var getAuthResponse = function () {
		return _authResponse;
	};

	var setAuthResponse = function ( authResponse, status ) {
		var currUserId = Runtime.UserID;
		var userId = '';
		if ( authResponse ) {
			if ( authResponse.userId ) {
				userId = authResponse.userID;
			} else if ( authResponse.signedRequest ) {
				var parsedRequest = SignedRequest.parse( authResponse.signedRequest );
				if ( parsedRequest && parsedRequest.user_id ) {
					userId = parsedRequest.user_id;
				}
			}
		}

		var loginStatus    = Runtime.LoginStatus;
		var cookieMismatch = Runtime.UseCookie && Runtime.CookieUserId !== userId;
		var userLogout     = currUserId && !authResponse;
		var userMismatch   = authResponse && currUserId && currUserId !== userId;
		var newResponse    = authResponse !== _authResponse;
		var statusChange   = status !== ( loginStatus || 'unknown' );

		Runtime.LoginStatus = status;
		Runtime.AccessToken = authResponse ? authResponse.accessToken : null;
		Runtime.UserID = userId;
		_authResponse = authResponse;

		var result = {
			'authResponse' : authResponse,
			'status'       : status
		};

		if ( userLogout || userMismatch ) {
			EventEmitter.fire( 'auth:logout', result );
		}
		if ( cookieMismatch || userMismatch ) {
			EventEmitter.fire( 'auth:login', result );
		}
		if ( newResponse ) {
			EventEmitter.fire( 'auth:authResponseChange', result );
		}
		if ( statusChange ) {
			EventEmitter.fire( 'auth:statusChange', result );
		}
		return result;
	};


	var fetchLoginStatus = function ( callback ) {

		var url = 'http://localhost:3000' + '/dialog/authorize' + '?' + QueryString.encode( {
			'client_id'     : Runtime.ClientId,
			'response_type' : 'token',
			'scope'         : 'xyz',
			'redirect_uri'  : 'null'
		} );

		var success = function ( response ) {
			callback( response );
		};

		var error = function () {
			throw new Error( arguments );
		};

		$.ajax( {
			'url'      : url,
			'dataType' : 'jsonp',
			'success'  : success,
			'error'    : error
		} );
	};

	var loginStatus;
	var getLoginStatus = function ( callback, force ) {
		if ( !Runtime.ClientId ) {
			throw new Error( 'getLoginStatus called before init' );
		}

		if ( callback ) {
			if ( !force && loginStatus === 'loaded' ) {
				callback( {
					'status'       : Runtime.LoginStatus,
					'authResponse' : getAuthResponse()
				} );
				return;
			} else {
				Observable.subscribe( 'PC.loginStatus', callback );
			}
		}
		if ( !force && loginStatus === 'loading' ) {
			return;
		}
		loginStatus = 'loading';
		var done = function ( response ) {
			loginStatus = 'loaded';
			Observable.inform( 'PC.loginStatus', response );
			Observable.clearSubscribers( 'PC.loginStatus' );
		};
		fetchLoginStatus( done );
	};

	var beginAuth = function ( options ) {
		if ( options.status ) {
			getLoginStatus();
		}

		if ( Runtime.ClientId ) {
			if ( options.authResponse ) {
				setAuthResponse( options.authResponse, 'connected' );
			} else if ( Runtime.UseCookie ) {
				var signedRequest = Cookie.loadSignedRequest();
				var parsedRequest;
				if ( signedRequest ) {
					try {
						parsedRequest = SignedRequest.parse( signedRequest );
					} catch ( error ) {
						Cookie.clearSignedRequestCookie();
					}
					if ( parsedRequest && parsedRequest.user_id ) {
						Runtime.CookieUserId = parsedRequest.user_id;
					}
				}
				Cookie.loadMeta();
			}
		}
	};

	EventEmitter.subscribe( 'init:complete', beginAuth );


	var Auth = {
		'setAuthResponse'  : setAuthResponse,
		'getAuthResponse'  : getAuthResponse,
		'getLoginStatus'   : getLoginStatus,
		'fetchLoginStatus' : fetchLoginStatus
	};

	return Auth;




	/*

	var e = require( 'sdk.Auth'),
	f = require( 'sdk.Cookie'),
	g = require( 'copyProperties'),
	h = require( 'sdk.Event'),
	i = require( 'FB'),
	j = require( 'Log'),
	k = require( 'sdk.Runtime'),
	l = require( 'sdk.SignedRequest'),
	m = require( 'sdk.ui');

	*/


			// var g = require( 'sdk.Cookie'),
			//     h = require( 'copyProperties'),
			//     i = require( 'sdk.createIframe'),
			//     j = require( 'DOMWrapper'),
			//     k = require( 'sdk.feature'),
			//     l = require( 'sdk.getContextType'),
			//     m = require( 'guid'),
			//     n = require( 'sdk.Impressions'),
			//     o = require( 'Log'),
			//     p = require( 'ObservableMixin'),
			//     q = require( 'QueryString'),
			//     r = require( 'sdk.Runtime'),
			//     s = require( 'sdk.SignedRequest'),
			//     t = require( 'UrlMap'),
			//     u = require( 'URL'),
			//     v = require( 'sdk.XD'),
			//     w, x, y = new p();

			// function setAuthResponse( authResponse, ga) {
			//     var ha = r.getUserID(),
			//         ia = '';
			//     if (fa)
			//         if (fa.userID) {
			//             ia = fa.userID;
			//         } else if (fa.signedRequest ) {
			//         var status = s.parse(fa.signedRequest );
			//         if (ja && ja.user_id) ia = ja.user_id;
			//     }
			//     var ka = r.getLoginStatus(),
			//         la = (ka === 'unknown' && fa) || (r.getUseCookie() && r.getCookieUserID() !== ia),
			//         ma = ha && !fa,
			//         na = fa && ha && ha != ia,
			//         oa = fa != w,
			//         pa = ga != (ka || 'unknown');
			//     r.setLoginStatus(ga);
			//     r.setAccessToken(fa && fa.accessToken || null );
			//     r.setUserID(ia);
			//     w = fa;
			//     var qa = {
			//         authResponse: fa,
			//         status: ga
			//     };
			//     if (ma || na) EventEmitter.inform( 'logout', qa);
			//     if (la || na) EventEmitter.inform( 'login', qa);
			//     if (oa) EventEmitter.inform( 'authresponse.change', qa);
			//     if (pa) EventEmitter.inform( 'status.change', qa);
			//     return qa;
			// }

			// function aa() {
			//     return w;
			// }

			// function ba( fa, ga, ha) {
			//     return function (ia) {
			//         var ja;
			//         if (ia && ia.access_token) {
			//             var ka = s.parse(ia.signed_request );
			//             ga = {
			//                 accessToken: ia.access_token,
			//                 userID: ka.user_id,
			//                 expiresIn: parseInt(ia.expires_in, 10),
			//                 signedRequest: ia.signed_request
			//             };
			//             if (r.getUseCookie()) {
			//                 var la = ga.expiresIn === 0 ? 0 : ES5( 'Date', 'now', false) + ga.expiresIn * 1000,
			//                     ma = g.getDomain();
			//                 if (!ma && ia.base_domain) g.setDomain( '.' + ia.base_domain);
			//                 g.setSignedRequestCookie(ia.signed_request, la);
			//             }
			//             ja = 'connected';
			//             setAuthResponse(ga, ja);
			//         } else if (ha === 'logout' || ha === 'login_status') {
			//             if (ia.error && ia.error === 'not_authorized') {
			//                 ja = 'not_authorized';
			//             } else ja = 'unknown';
			//             setAuthResponse(null, ja);
			//             if (r.getUseCookie()) g.clearSignedRequestCookie();
			//         }
			//         if (ia && ia.https == 1) r.setSecure(true);
			//         if (fa) fa({
			//             authResponse: ga,
			//             status: r.getLoginStatus()
			//         });
			//         return ga;
			//     };
			// }

			// function ca(fa) {
			//     var ga, ha = ES5( 'Date', 'now', false);
			//     if (x) {
			//         clearTimeout(x);
			//         x = null;
			//     }
			//     var ia = ba( fa, w, 'login_status'),
			//         ja = u(t.resolve( 'www', true) + '/connect/ping').setSearch(q.encode({
			//             client_id: r.getClientID(),
			//             response_type: 'token,signed_request,code',
			//             domain: location.hostname,
			//             origin: l(),
			//             redirect_uri: v.handler(function (ka) {
			//                 if (k( 'e2e_ping_tracking', true)) {
			//                     var la = {
			//                         init: ha,
			//                         close: ES5( 'Date', 'now', false),
			//                         method: 'ping'
			//                     };
			//                     o.debug( 'e2e: %s', ES5( 'JSON', 'stringify', false, la));
			//                     n.log(114, {
			//                         payload: la
			//                     });
			//                 }
			//                 ga.parentNode.removeChild(ga);
			//                 if (ia(ka)) x = setTimeout(function () {
			//                     ca(function () {});
			//                 }, 1200000);
			//             }, 'parent'),
			//             sdk: 'joey',
			//             kid_directed_site: r.getKidDirectedSite()
			//         }));
			//     ga = i({
			//         root: j.getRoot(),
			//         name: m(),
			//         url: ja.toString(),
			//         style: {
			//             display: 'none'
			//         }
			//     });
			// }
			// var da;

			// function ea( fa, ga) {
			//     if (!r.getClientID()) {
			//         o.warn( 'PC.getLoginStatus() called before calling PC.init().');
			//         return;
			//     }
			//     if (fa)
			//         if (!ga && da == 'loaded') {
			//             fa({
			//                 status: r.getLoginStatus(),
			//                 authResponse: aa()
			//             });
			//             return;
			//         } else y.subscribe( 'PC.loginStatus', fa);
			//     if (!ga && da == 'loading') return;
			//     da = 'loading';
			//     var ha = function (ia) {
			//         da = 'loaded';
			//         EventEmitter.inform( 'PC.loginStatus', ia);
			//         y.clearSubscribers( 'PC.loginStatus');
			//     };
			//     ca(ha);
			// }
			// h(y, {
			//     getLoginStatus: ea,
			//     fetchLoginStatus: ca,
			//     setAuthResponse: z,
			//     getAuthResponse: aa,
			//     parseSignedRequest: s.parse,
			//     xdResponseWrapper: ba
			// });
			// return y;
} );