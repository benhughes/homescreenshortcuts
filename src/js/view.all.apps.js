define([
    'log',
    'collection.all.apps',
    'text!../templates/all.apps.html',
    'text!../templates/main.apps.html'
], function (log, collectionApps, allAppsTemplate, appsTemplate) {
    return Backbone.View.extend({
        logPrefix: "views.all.apps",
        className: 'main',
        $mainContainer: null,
        collectionApps: collectionApps,
        templates: {
            allAppsTemplate: Handlebars.compile(allAppsTemplate),
            appsTemplate: Handlebars.compile(appsTemplate)
        },
        cache: {},
        setUpCache: function () {
            this.cache = {
                allAppsTemplate: '',
                mainTemplate: ''
            };
        },
        initialize: function () {
            log(this.logPrefix, 'initializing...');
            this.$mainContainer = $('#mainContainer');
            this.setUpCache();
            this.bindEvents();
            this.render();
        },
        bindEvents: function () {
            this.collectionApps.on('add', $.proxy(this.renderAppList, this));
            this.collectionApps.on('change', $.proxy(this.renderAppList, this));
        },
        render: function () {
            var data = {};
            this.el.innerHTML = this.templates.allAppsTemplate(data);
            this.$mainContainer.html(this.el);
            this.renderAppList();
        },
        renderAppList: function () {
            var data = {apps: this.collectionApps.toJSON()},
                html = this.templates.appsTemplate(data);

            if (html !== this.cache.appsTemplate) {
                log(this.logPrefix, 'renering appList');
                $('#allAppsList').html(html);
                this.cache.appsTemplate = html;
            }
        }
    });
});