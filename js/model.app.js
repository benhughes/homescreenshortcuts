define([
    'log'
], function (log) {
    return Backbone.Model.extend({
            logPrefix: "model.app.js",

            initialize: function () {
                log(this.logPrefix, 'initialising');
            }
        });
});
