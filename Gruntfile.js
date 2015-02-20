module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.initConfig({
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'assets/stylesheets/app.css': 'sass/app.scss'
        }
      }
    }
  });

  grunt.registerTask('default', ['sass']);
}
