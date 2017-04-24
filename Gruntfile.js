module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      scripts: {
        expand: true,
        cwd: 'client/',
        src: ['scripts/*.js',
              'scripts/**/*.js'],
        dest: 'server/public/'
      },
      html: {
        expand: true,
        cwd: 'client/views',
        src: ['*.html',
              '**/*.html'],
        dest: 'server/public/views/'
      },
      css: {
        expand: true,
        cwd: 'client/styles',
        src: ['style.css'],
        dest: 'server/public/styles/'
      },
      angular: {
        expand: true,
        cwd: 'node_modules/angular/',
        src: ['angular.js',
              'angular.min.js',
              'angular.min.js.map'],
        dest: 'server/public/vendors/angular/'
      },
      d3: {
        expand: true,
        cwd: 'node_modules/d3/build',
        src: ['d3.min.js'],
        dest: 'server/public/vendors/d3/'
      },
      jquery: {
        expand: true,
        cwd: 'node_modules/jquery/dist',
        src: ['jquery.min.js'],
        dest: 'server/public/vendors/jquery/'
      }
      // jQuery-UI added manually
      // Unsure about Nodemailer & Vis...
    },
    watch: {
      files: [
        'client/**/*.*'
      ],
      tasks: ['copy']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['copy', 'watch']);
};
