module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options:{
        seperator: ';',
      },
      dist: {
        src: ['public/client/*.js'],
        dest: 'public/dist/built.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify:  {
       dynamic_mappings: {
      // Grunt will search for "**/*.js" under "lib/" when the "uglify" task
      // runs and build the appropriate src-dest file mappings then, so you
      // don't need to update the Gruntfile when files are added or removed.
      files: [
        {
          expand: true,     // Enable dynamic expansion.
          cwd: 'public/client',      // Src matches are relative to this path.
          src: ['**/*.js'], // Actual pattern(s) to match.
          dest: 'public/build/',   // Destination path prefix.
          ext: '.min.js',   // Dest filepaths will have this extension.
          extDot: 'first'   // Extensions in filenames begin after the first dot
        },
        {
          expand: true,     // Enable dynamic expansion.
          cwd: 'public/lib',      // Src matches are relative to this path.
          src: ['**/*.js'], // Actual pattern(s) to match.
          dest: 'public/build/',   // Destination path prefix.
          ext: '.min.js',   // Dest filepaths will have this extension.
          extDot: 'first'   // Extensions in filenames begin after the first dot
        }
      ],
    },
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      }
    },

      jshint: {
        all: ['app/**/*.js', 'lib/**/*.js', 'public/**/*.js', 'test/**/*.js', '*.js'],
        options: {
          force: 'true',
          jshintrc: '.jshintrc',
          ignores: [
          'public/lib/**/*.js',
          'public/dist/**/*.js',
          'public/build/**/*.js'
          ]
        }
      },


    cssmin: {
    },

    watch: {
      scripts: {
        files: [
        'public/client/**/*.js',
        'public/lib/**/*.js',
        ],
        tasks: [
        'concat',
        'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    }

  });

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-mocha-test');
grunt.loadNpmTasks('grunt-shell');
grunt.loadNpmTasks('grunt-nodemon');

grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
     cmd: 'grunt',
     grunt: true,
     args: 'nodemon'
   });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  grunt.registerTask('default', ['jshint','mochaTest']);


  grunt.registerTask('build', [
    ]);

  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', ['uglify', 'concat']);

};
