define([
    'log'
], function (log) {
    var logPrefix = "router";
    return Backbone.Router.extend({
            routes: {
                "": 'main',
                "home": 'main',
                "app-view/:id": 'appView',
                "custom-shortcut": "customShortcutView"
            },
            main: function () {
                log(logPrefix, "Navigating to main");
                require(['view.main'], function (viewMain) {
                    new viewMain();
                });
            },
            appView: function (id) {
                log(logPrefix, "Navigating to app", id);
                require(['view.app'], function (ViewApp) {
                    new ViewApp({id: id});
                });

            },
            customShortcutView: function () {
                log(logPrefix, "navigating to custom shortcut creation view");
                require(['view.custom.shortcut'], function (ViewCustomShortcut) {
                    new ViewCustomShortcut();
                })

            },
            initialize: function () {
                log(logPrefix, "initializing Router");
                Backbone.history.start();

            }
        });
});