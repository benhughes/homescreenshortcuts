var baseData = require('../../data-uncompiled/base-data.json'),
    path = require('path'),
    staticApi = require('static-api');


var dataFolder = path.join(__dirname, '../../src/data');

baseData = sortApps(baseData);
baseData = preparePopularApps(baseData);

new staticApi({
    outputFolder: dataFolder,
    object: baseData
});

function preparePopularApps(origData) {
    var popularApps = origData.popular || [],
        populatedPopularApps = {};

    console.log('preparing popular apps');

    for (var i = 0; i < popularApps.length; i++) {
        populatedPopularApps[popularApps[i]] = origData.apps[popularApps[i]];
    }
    origData.popular = populatedPopularApps;

    return origData;
}

function sortApps(origData) {
    var appData = origData.apps,
        sort, appKeys, sortedApps = {};

    sort = function (a, b) {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    };
    console.log('sorting apps');
    appKeys = Object.keys(appData).sort(sort);

    for (var i = 0; i < appKeys.length; i++) {
        sortedApps[appKeys[i]] = appData[appKeys[i]];
    }

    origData.apps = sortedApps;
    return origData;
}