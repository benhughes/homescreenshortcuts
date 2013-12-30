define(['log'], function (log) {
    var logPrefix = "router";
    return Backbone.Router.extend({
        routes: {
            "": 'main',
            "home": 'main',
            "apps": "apps",
            "app-view/:id": 'appView',
            "custom-shortcut": "customShortcutView",
            "custom-shortcut/*path": "customShortcutViewParams"
        },
        main: function () {
            log(logPrefix, "Navigating to main");
            require(['view.main'], function (ViewMain) {
                new ViewMain();
            });
        },
        apps: function () {
            log(logPrefix, "Navigating to apps");
            require(['view.all.apps'], function (ViewApps) {
                new ViewApps();
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
            });

        },
        customShortcutViewParams: function (params) {
            log(logPrefix, "navigating to custom shortcut creation view with params", params);
            require(['view.custom.shortcut', 'utils'], function (ViewCustomShortcut, utils) {
                new ViewCustomShortcut({urlParams: utils.convertParamsToObject(params)});
            });
        },
        initialize: function () {
            log(logPrefix, "initializing Router");
            Backbone.history.start();

        }
    });
});