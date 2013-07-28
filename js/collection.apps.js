define([
    'log',
    'model.app'
], function (log, AppModel) {
    'use strict';
    var AppsCollection = Backbone.Firebase.Collection.extend({
        logPrefix: "collection.apps.js",
        model: AppModel,
        firebase: "https://homescreenshortcuts.firebaseio.com/apps",
        initialize: function () {
            log(this.logPrefix, 'initialising with path ', this.firebase);
        }
    });

    return new AppsCollection();
});
