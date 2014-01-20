'use strict';

module.exports = function ( grunt ) {

	grunt.loadTasks( './build' );

	grunt.registerTask( 'default', 'default tasks', [ 'build' ] );

};