var baseData = require('../../data-uncompiled/base-data.json'),
    path = require('path'),
    fs = require('fs'),
    staticApi = require('./static-api/static-api');


var dataFolder = path.join(__dirname, '../../data/');

if (!baseData.apps) {
    throw('No app data in base-data.json');
}

new staticApi({
    outputFolder: dataFolder,
    object: baseData
});