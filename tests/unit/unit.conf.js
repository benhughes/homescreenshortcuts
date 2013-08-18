// Karma configuration
// Generated on Sun Aug 18 2013 14:25:34 GMT+0100 (BST)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '../..',


    // frameworks to use
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'src/js/*.js', included: false},
      {pattern: 'tests/unit/**spec.js', included: false},
      'src/js/lib/underscore/underscore.js',
      'src/js/lib/backbone/backbone.min.js',
      'tests/unit/unit.test.launcher.js'
    ],


    // list of files to exclude
    exclude: [
      
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['dots', 'junit', 'coverage'],


    preprocessors: {
        './src/js/*.js': 'coverage'
    },

    coverageReporter: {
        type: 'html',
        dir: 'tests/out/unit/'
    },

    junitReporter: {
        // will be resolved to basePath (in the same way as files/exclude patterns)
        outputFile: 'tests/out/test-results-unit.xml'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Safari'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
