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
                dest: 'homescreenshortcuts-release/',
            }
        },
        shell: {
            outVersion: {
                options: {
                    stdout: true
                },
                command: 'echo <%= nextVersion() %>'
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

    grunt.registerTask('build', ['compliment', 'karma', 'build-api', 'copy:main']);
    grunt.registerTask('release', ['build', 'shell:commitChanges'])
};