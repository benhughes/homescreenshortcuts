define([
    'log'
], function (log) {
    return Backbone.Model.extend({
        logPrefix: "model.app.js",
        url: function () {
            return 'data/apps/' + this.id + '/' + this.id + '.json';
        }
    });
});
