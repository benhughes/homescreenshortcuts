define([
    'log',
    'collections/app.collection'
], function (log, AppCollection) {
    'use strict';
    var logPrefix = 'collection.all.apps';
    log(logPrefix, 'Creating instance of collection for allApps');
    return new AppCollection();
});
