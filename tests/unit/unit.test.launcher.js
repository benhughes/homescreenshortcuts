var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

//overwrite the log. We don't want console.log to be fired
define('log', function () {
    return jasmine.createSpy('log');
});

//mocking the text to get over issues
define('text', function () {
    return {load:function(name, req, onLoad, config){onLoad('test');}};//jasmine.createSpy('test');
});

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/src/js',
    urlArgs: "bust=" + (new Date()).getTime(),

    // ask Require.js to load these files (all our tests)
    deps: tests,



    // start test run, once Require.js is done
    callback: window.__karma__.start
});