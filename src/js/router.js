define([
    'log'
], function (log) {
    var logPrefix = "router";
    return Backbone.Router.extend({
            routes: {
                '': 'main',
                'home': 'main',
                "app-view/:id": 'appView'
            },
            main: function () {
                log(logPrefix, "Navigating to main");
                require(['view.main.js'], function (viewMain) {
                    new viewMain();
                });
            },
            appView: function (id) {
                log(logPrefix, "Navigating to app", id);
                require(['view.app.js'], function (ViewApp) {
                    new ViewApp({id: id});
                });

            },
            initialize: function () {
                log(logPrefix, "initializing Router");
                Backbone.history.start();

            }
        });
});