var path = require('path'),
    buildHelpers = require('./build/build-helpers/build-helpers');



module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        nextVersion: function () {
            var ver = this.pkg.version.split('.');

            ver[2] = parseInt(ver[2], 10) + 1;
            return ver.join('.');
        },
        releaseRepoName: 'homescreenshortcuts-release',
        karma: {
            unit: {
                configFile: 'tests/unit/unit.conf.js',
                autoWatch: false
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'src/', src: ['css/**', 'data/**', 'img/**', 'js/**', 'templates/**', '*.html', 'Web.config'], dest: 'build-output/'}
                ]
            },
            toRepo: {
                src: 'build-output/**',
                dest: 'homescreenshortcuts-release/'
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "build-output/js/",
                    name: 'main',
                    findNestedDependencies: true,
                    mainConfigFile: "build-output/js/main.js",
                    out: "build-output/r-main.js"
                }
            }
        },
        uglify: {
            libs: {
                files: {
                    'build-output/lib.js': buildHelpers.getLibList(path.resolve(__dirname, 'src/index.html'))
                }
            }
        },
        shell: {
            outVersion: {
                options: {
                    stdout: true
                },
                command: 'echo <%= nextVersion() %>'
            },
            cleanBuildOutput: {
                command: ['rm -r build-output',
                    'mkdir build-output'].join(';')

            },
            commitChanges: {
                options: {
                    stdout: true
                },
                command: [
                    'mkdir <%= releaseRepoName %>',
                    'git clone https://github.com/benhughes/<%= releaseRepoName %>.git',
                    'cp -R build-output/** <%= releaseRepoName %>',
                    'cd <%= releaseRepoName %>/',
                    'git add *',
                    'git commit -m "Release version <%= nextVersion() %>"',
                    'git push -u origin master',
                    'cd ../',
                    'rm -r <%= releaseRepoName %>/'
                ].join(' ; ')

            }

        }

    });

    grunt.registerTask('compliment', function() {
        grunt.log.writeln('You are so awesome!');
    });

    grunt.registerTask('build-api', function () {
        require('./build/data-build/data-build.js')
    });

    grunt.registerTask('build-html', function() {
        buildHelpers.buildHtml('build-output/index.html')
    })

    grunt.registerTask('addVersionNumber', function () {
        var fs = require('fs');
        var html = fs.readFileSync('build-output/index.html');
        grunt.log.writeln(grunt.config.process('nextVersion'));
        grunt.log.writeln(html);

        html = html.replace('<!--version:local-->', '<!--version:' + grunt.config.process('nextVersion()') + '-->');
        fs.writeFileSync('build-output/index.html', html);
    });



    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build-js', ['requirejs', 'uglify:libs']);

    grunt.registerTask('build', ['compliment', 'karma', 'shell:cleanBuildOutput', 'build-api', 'copy:main', 'build-js', 'build-html']);
    grunt.registerTask('release', ['build', 'shell:commitChanges'])
};