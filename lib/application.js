var fileConfig, server, mongoose;

// Load modules
var _     = require( 'lodash' );
var path  = require( 'path' );
__basedir = path.join( __dirname, '../' );
var util  = require( 'util' );
var async = require( 'async' );
var paths = require( 'paths' );
var vent  = require( paths( 'events.vent' ) );

try {
	fileConfig = require( paths( 'config' ) );
} catch ( error ) {
	fileConfig = {};
}

var config = {
	'rest' : _.defaults( {
		'protocol' : 'http://',
		'host'     : process.env.NODE_REST_HOST,
		'port'     : process.env.NODE_REST_PORT
	}, fileConfig.rest ),

	'mongodb' : _.defaults( {
		'host'     : process.env.NODE_MONGO_HOST,
		'database' : process.env.NODE_MONGO_DATABASE
	}, fileConfig.mongodb )
};

// Suppress util.log's in HTML coverage or terminal for tests
if ( process.env.NODE_ENV === 'coverage' || process.argv[ 1 ].match( 'mocha' ) ) {
	util.log = function () {};
}

var startServer = function ( callback ) {

	// Load modules
	var io;
	var path     = require( 'path' );
	var fs       = require( 'fs' );
	var http     = require( 'http' );
	var express  = require( 'express' );
	var passport = require( 'passport' );
	var app      = express();
	mongoose     = require( 'mongoose' );
	server       = http.createServer( app );

	// ### Passport authentication setup

	// Accept authorization via query if not found in headers
	app.use( require( paths( 'middleware.express.authorizationOverride' ) ) );

	// Load middleware
	var authenticate = require( paths( 'middleware.passport.authenticate' ) );

	app.use( passport.initialize() );
	passport.use( authenticate.basic() );

	// ### Express, Socket.IO, and MongoDB connections

	// ## Load middleware

	// Compress response data with gzip/deflate
	app.use( express.compress() );

	app.use( express.bodyParser( {
		'keepExtensions' : true,
		'uploadDir'      : paths( 'uploads' )
	} ) );

	app.disable( 'x-powered-by' );

	// Public files
	var publicFiles = path.join( __basedir, 'public' );
	if ( fs.existsSync( publicFiles ) ) {
		app.use( '/public', express.static( publicFiles ) );
	}

	// Ensure correct `Content-Type` header
	app.use( require( paths( 'middleware.express.contentType' ) ) );

	// Sanitize request.body
	app.use( require( paths( 'middleware.express.sanitization' ) ) );

	// Search parameters for routes
	app.use( require( paths( 'middleware.express.search' ) ) );

	// ## start up services
	async.series( [

		// ### Express connection
		function ( callback ) {
			server.listen( config.rest.port, function () {
				util.log( 'Server running at ' + config.rest.protocol + config.rest.host + ':' + config.rest.port );

				callback();
			} );
		},

		// ### MongoDB connection
		function ( callback ) {
			var mongoUrl = 'mongodb://' + config.mongodb.host + '/' + config.mongodb.database;

			mongoose.connect( mongoUrl, function ( error ) {
				if ( error ) {
					util.log( 'Error connecting to MongoDB: ' + error );

					return callback( error );
				}

				util.log( 'Connected to MongoDB at ' + mongoUrl );

				callback();
			} );
		},

		// ### Bootstrap
		function ( callback ) {

			// Bootstrap Mongoose schemas
			require( paths( 'schemas' ) )();

			// Bootstrap the REST API Controllers
			require( paths( 'controllers' ) )( app );

			// Bootstrap Event Listeners
			require( paths( 'events' ) )();

			callback();
		},

		function ( callback ) {
			app.use( require( paths( 'middleware.express.middlewareError' ) ) );

			callback();
		}

	], function ( error, results ) {
		if ( error ) {
			throw new Error( error );
		}

		if ( typeof callback === 'function' ) {
			callback();
		}
	} );

};

var stopServer = function ( callback ) {
	async.series( [

		// server
		function ( callback ) {
			server.close( callback );
		},

		// mongoose
		function ( callback ) {
			mongoose.disconnect( callback );
		}

	], function ( error, results ) {
		callback();
	} );
};

module.exports = {
	'start'  : startServer,
	'stop'   : stopServer,
	'config' : config,
	'vent'   : vent
};