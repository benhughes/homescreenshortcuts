define([
    'log',
    'collection.popular.apps',
    'text!../templates/home-main.html',
    'text!../templates/main.apps.html'
], function (log, collectionApps, mainTemplate, appsTemplate) {
    return Backbone.View.extend({
        logPrefix: "views.main",
        className: 'main',
        $mainContainer: null,
        collectionApps: collectionApps,
        templates: {
            mainTemplate: Handlebars.compile(mainTemplate),
            appsTemplate: Handlebars.compile(appsTemplate)
        },
        cache: {
            appsTemplate: '',
            mainTemplate: ''
        },
        initialize: function () {
            log(this.logPrefix, 'initializing...');
            this.$mainContainer = $('#mainContainer');
            this.bindEvents();
            this.render();
        },
        bindEvents: function () {
            this.collectionApps.on('add', $.proxy(this.renderAppList, this));
            this.collectionApps.on('change', $.proxy(this.renderAppList, this));

        },
        render: function () {
            var data = {};
            this.el.innerHTML = this.templates.mainTemplate(data);
            this.$mainContainer.html(this.el);
            this.renderAppList();
        },
        renderAppList: function () {
            var data = {apps: this.collectionApps.toJSON()},
                html = this.templates.appsTemplate(data);

            if (html !== this.cache.appsTemplate) {
                $('#popularAppsList').html(html);
            }
        }
    });
});