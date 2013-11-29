module.exports = function(grunt) {
	'use strict';

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      vendor: {
        src: 'dist/js/vendor.js',
        dest: 'dist/js/vendor.min.js'
      },
      dist: {
        src: 'dist/js/<%= pkg.name %>.js',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'browserify', 'concat:dist']
      },
      templates: {
        files: 'lib/templates/*.hbs',
        tasks: ['handlebars']
      },
      css: {
        files: 'lib/css/*.styl',
        tasks: ['stylus']
      }
    },
		browserify: {
      client: {
				options: {
					debug: true
				},
        src: ['lib/entry.js'],
        dest: 'dist/js/app.js'
      }
    },
		handlebars: {
			compile: {
				options: {
					namespace: 'JST'
				},
				files: {
					'dist/js/templates.js': ['lib/templates/*.hbs']
				}
			}
		},
		stylus: {
			compile: {
				files: {
					'dist/css/cloudlan.css': ['lib/css/*.styl']
				}
			}
		},
		concat: {
			vendor: {
        src: [
					'vendor/leaflet-src.js',
					'vendor/jquery-2.0.3.js',
					'vendor/handlebars.runtime.js',
					'vendor/bootstrap.min.js',
					'vendor/bootstrap-select.js'
				],
				dest: 'dist/js/vendor.js'
			},
			dist: {
        src: [
					'dist/js/app.js'
				],
				dest: 'dist/js/cloudlan.js'
			}
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-contrib-stylus');

  // Default task.
  grunt.registerTask('default', ['jshint', 'browserify', 'concat:dist', 'uglify:dist', 'handlebars', 'stylus']);
  grunt.registerTask('compile', ['jshint', 'browserify', 'concat', 'uglify', 'handlebars', 'stylus']);

};
