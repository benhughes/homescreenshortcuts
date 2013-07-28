// Filename: app.js
define([
    'log'
], function (log) {
    var logPrefix = "app",
        init = function () {
            //var router = new Router();
            log(logPrefix, 'Initialising app.js');
        };

    return {
        init: init
    };
});