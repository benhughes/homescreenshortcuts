define([
    'log',
    'model.app'
], function (log, AppModel) {
    'use strict';
    var AppsCollection = Backbone.Collection.extend({
        logPrefix: "collection.apps.js",
        model: AppModel,
        url: 'data/apps/apps.json',
        parse: function (data) {
            var processedData = [];
            _.each(data, function (item) {
                processedData.push(item);
            }, this);
            return processedData;
        },
        initialize: function () {
            this.fetch();
            log(this.logPrefix, 'initialising with path ', this.url);
        }
    });

    return new AppsCollection();
});
