module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'server/**/*.js'],
      options: {
        globals: {
          jQuery: true
        },
        ignores: ['server/client/bower_components/**/*.js'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);
};
