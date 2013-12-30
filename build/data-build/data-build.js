var baseData = require('../../data-uncompiled/base-data.json'),
    path = require('path'),
    staticApi = require('static-api');


var dataFolder = path.join(__dirname, '../../src/data');
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
