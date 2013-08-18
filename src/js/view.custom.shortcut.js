define([
    'log',
    'text!/templates/customShortcutView.html',
    'text!/templates/shortcut.html'
], function (log, customShortcutTemplate, shortcutTemplate) {
    'use strict';

    return Backbone.View.extend({
        logPrefix: 'view.custom.shortcut',
        $mainContainer: null,
        templates: {
            customShortcutTemplate: Handlebars.compile(customShortcutTemplate),
            shortcutTemplate: Handlebars.compile(shortcutTemplate)
        },
        initialize: function () {
            log(this.logPrefix, 'initializing....');
            this.$mainContainer = $('#mainContainer').addClass('loading');
            this.render();

        },
        render: function () {
            this.el.innerHTML = this.templates.customShortcutTemplate({});
            this.$mainContainer.html(this.el);
        }
    });
});