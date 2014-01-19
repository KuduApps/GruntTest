var path = require('path');

module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        DEV_OUTPUT_PATH: path.join(__dirname, '..', 'dist', 'dev'),
        PROD_OUTPUT_PATH: path.join(__dirname, '..', 'dist', 'prod'),
        clean: {
            dev: {
                cwd: '<%= DEV_OUTPUT_PATH %>',
                files: [ '**/*', '!node_modules/**'  ]
            },
            prod: {
                cwd: '<%= PROD_OUTPUT_PATH %>',
                files: [ '**/*' ]
            }
        },
        less: {
            dev: {
                options: {
                    compress: false
                },
                files: {
                    'public/css/normalize.min.css': 'assets/less/vendor/normalize.less',
                    'public/css/style.min.css': 'assets/less/style.less'
                }
            },
            prod: {
                options: {
                    compress: true
                },
                files: {
                    'public/css/normalize.min.css': 'assets/less/vendor/normalize.less',
                    'public/css/style.min.css': 'assets/less/style.less'
                }
            }
        },
        copy: {
            dev: {
                files: [ 
                    {
                        expand: true,
                        src: [
                            'views/**/*.jade',
                            'model/*.js', 'routes/**/*.js', 'public/**', 'services/*.js',
                            '*.js', '*.ts', '!gruntfile.js', 'package.json', 'web.config'
                        ],
                        dest: '<%= DEV_OUTPUT_PATH %>'
                    }
                ]
            },
            prod: {
                files: [ 
                    {
                        expand: true,
                        src: [
                            'views/**/*.jade',
                            'model/*.js', 'routes/**/*.js', 'public/**', 'services/*.js',
                            '*.js', '*.ts', '!gruntfile.js', 'package.json'
                        ],
                        dest: '<%= PROD_OUTPUT_PATH %>'
                    },
                    {   expand: true, src: ['web.cloud.config'], dest: '<%= PROD_OUTPUT_PATH %>',
                        rename: function(src) {
                            return path.join(src, 'web.config');
                        }
                    }
                ]
            }
        }
    });

    grunt.registerTask('clean','cleans the directories', function(env) {
        grunt.config.requires(['clean', env]);
        var config = grunt.config(['clean', env]);
        
        var cwd = config.cwd;
        var files = config.files;
        var expandedFiles = grunt.file.expand({cwd: cwd}, files)
        
        expandedFiles.forEach(function(file) {
            var filePath = path.join(cwd, file);
            if (grunt.file.exists(filePath)) {
                grunt.file.delete(filePath, { force: true });
            }
        });
    });
    
    grunt.registerTask('build', 'builds the application', ['clean:dev', 'less:dev', 'copy:dev']);
    grunt.registerTask('publish', 'builds the application', ['clean:prod', 'less:prod', 'copy:prod']);
    // responsible for compiling less files.
    grunt.loadNpmTasks('grunt-contrib-less');
    // responsible for copying files to the deploy directory.
    grunt.loadNpmTasks('grunt-contrib-copy');
};