define([
    'log',
    'collections/app.collection'
], function (log, AppCollection) {
    'use strict';
    var logPrefix = 'collection.popular.apps';
    log(logPrefix, 'Creating instance of popular apps');

    return new AppCollection(undefined, {url: 'data/popular/popular.json'});
});
