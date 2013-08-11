var baseData = require('../../data-uncompiled/base-data.json'),
    path = require('path'),
    staticApi = require('static-api');


var dataFolder = path.join(__dirname, '../../src/data');
console.log(dataFolder)

new staticApi({
    outputFolder: dataFolder,
    object: baseData
});
