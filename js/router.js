define([
    'log',
    'view.main',
    'view.app'
], function (log, ViewMain, ViewApp) {
    var logPrefix = "router";
    return Backbone.Router.extend({
            routes: {
                '': 'main',
                'home': 'main',
                "app-view/:id": 'appView'
            },
            main: function () {
                log(logPrefix, "Navigating to main");

                new ViewMain();
            },
            appView: function (id) {
                log(logPrefix, "Navigating to app", id);
                new ViewApp({id: id});

            },
            initialize: function () {
                log(logPrefix, "initializing Router");
                Backbone.history.start();

            }
        });
});