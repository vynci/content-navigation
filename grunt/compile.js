'use strict';

module.exports = function ( grunt ) {

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('assemble-less');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	var lessFiles = {
		'public/css/styles.min.css' : [ 'public/css/styles.less' ]
	};

	var uglifyFiles = {
		'public/js/main.min.js' : [ 'public/js/main.compile.js' ]
	};

	grunt.config.set( 'less', {
		 'compile' : {
			'options' : {
				'compress' : true,
				'ieCompat' : true
			},
			'files' : lessFiles
		}
	} );

	grunt.config.set( 'uglify', {
		'requirejs' : {
			'files' : uglifyFiles
		}
	} );

	grunt.config.set( 'requirejs', {
		'compile' : {
			'options' : {
				'baseUrl'        : 'public/js/',
				'mainConfigFile' : 'public/js/require-config.js',
				'out'            : 'public/js/main.compile.js',
				'include'        : 'main',

				'optimize' : 'none',

				'inlineText' : true,
				'useStrict'  : true,
				'logLevel' : 0,

				'skipPragmas'   : false,
				'pragmasOnSave' : {
					'excludeCoffeeScript' : true
				},

				'skipModuleInsertion'        : false,
				'stubModules'                : [ 'text' ],
				'optimizeAllPluginResources' : false,
				'findNestedDependencies'     : false,
				'removeCombined'             : false,

				'fileExclusionRegExp' : /^\./,

				'shim' : {
					'jquery-cookie' : {
						'deps' : [ 'jquery' ]
					},
					'deps' : [ 'jquery','underscore' ]
				}
			}
		}
	} );

	grunt.registerTask( 'compile', 'compiles f/e', function () {
		grunt.task.run( [ 'compile:js', 'uglify:js', 'compile:less' ] );
	} );

	grunt.registerTask( 'compile:js', 'compiles f/e with requirejs optimizer (r.js)', [ 'requirejs' ] );

	grunt.registerTask( 'uglify:js', 'uglifies main.compile.js', [ 'uglify:requirejs' ] );

	grunt.registerTask( 'compile:less', 'compiles LESS source to CSS', [ 'less' ] );

};