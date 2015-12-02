module.exports = function(grunt) {

    var dir = {
        css: 'www/static/css/',
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
       
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'www/static/css/main.css': [dir.css + '*.css']
                }
            }
        },

        unused: {
            options: {
                reference: 'www/',
                directory: ['**/*.ejs', '**/*.html', '**/*.css'],
                remove: false // set to true to delete unused files from project 
            }
        },

        clean: {
            src: [dir.css + '*', "!www/**/*.css"]
        },
    });
    
    grunt.loadNpmTasks('grunt-unused');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', 'build');
    grunt.registerTask('build', ['unused', 'cssmin', 'clean']);
    
};