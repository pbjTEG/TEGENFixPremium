const git = require('git-rev-sync');
module.exports = function (grunt) {
	const thisTag    = git.tag(),
	      thisBranch = git.branch();

	grunt.initConfig({
		                 pkg      : grunt.file.readJSON('package.json'),
		                 banner   : '/*\n' +
		                            '* <%= pkg.title %>\n' +
		                            '*\n' +
		                            '* <%= pkg.description %>\n' +
		                            '*\n' +
		                            '* Author: <%= pkg.author %>\n' +
		                            '* Copyright (c) <%= grunt.template.today("yyyy") %> PMG: The Engage Group\n' +
		                            '* License <%= pkg.licence %>\n' +
		                            '*\n' +
		                            '* Release:\n' +
		                            '*   Branch: ' + thisBranch + '\n' +
		                            '*   Tag:    ' + thisTag + '\n' +
		                            '*   Date:   ' + grunt.template.today('yyyymmdd') + '\n' +
		                            '*/\n',
		                 postFix  : `_${thisTag}`,
		                 postFixEN: `_${thisTag}`.replace(/\./g, '_'),
		                 uglify   : {
			                 options: {
				                 banner   : '<%= banner %>',
				                 sourceMap: 'dist/<%= pkg.filename %>.min.js.map'
			                 },
			                 build  : {
				                 src : 'src/<%= pkg.filename %>.js',
				                 dest: 'dist/<%= pkg.filename %>.min.js'
			                 },
		                 },
		                 copy     : {
			                 dist: {
				                 files: [
					                 {
						                 src : 'dist/<%= pkg.filename %>.min.js',
						                 dest: 'dist/<%= pkg.filename %><%= postFix %>.min.js',
					                 },
					                 // EN no longer allows multiple "."
					                 {
						                 src : 'dist/<%= pkg.filename %>.min.js',
						                 dest: 'dist/<%= pkg.filename %><%= postFixEN %>_min.js',
					                 },
					                 {
						                 src : 'dist/<%= pkg.filename %>.min.js.map',
						                 dest: 'dist/<%= pkg.filename %><%= postFix %>.min.js.map',
					                 },
				                 ]

			                 }
		                 }
	                 });

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Default task(s).
	grunt.registerTask('default', ['uglify', 'copy']);

};
