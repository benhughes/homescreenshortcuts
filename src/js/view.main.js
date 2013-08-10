define([
    'log',
    'collection.apps',
    'text!/templates/main.html',
    'text!/templates/main.apps.html',
    'text!/templates/shortcut.html'
], function (log, collectionApps, mainTemplate, appsTemplate, shortcutTemplate) {
    return Backbone.View.extend({
        logPrefix: "views.main",
        className: 'main',
        $mainContainer: null,
        collectionApps: collectionApps,
        templates: {
            mainTemplate: Handlebars.compile(mainTemplate),
            appsTemplate: Handlebars.compile(appsTemplate),
            shortcutTemplate: Handlebars.compile(shortcutTemplate)
        },
        cache: {
            appList: ''
        },
        initialize: function () {
            log(this.logPrefix, 'initializing...');
            this.$mainContainer = $('#mainContainer');
            this.bindEvents();
            this.render();
        },
        events: {
            //'click #appsList a': 'handleAppLinkCLick'
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


            if (html !== this.cache.appList) {
                $('#appsList').html(html);
            }
        },
        handleAppLinkCLick: function (e) {
            var linkData = $(e.target).data(),
                shortcutData, html;
            e.preventDefault();
            log(this.logPrefix, 'detecting click on app link');
            shortcutData = this.prepareShortcutData(linkData);
            html = 'data:text/html;charset=UTF-8,' + this.templates.shortcutTemplate(shortcutData);
            console.log(shortcutData);
            console.log(html);
            location.href = html;
        },
        prepareShortcutData: function (linkData) {
            var returnedData;
            if (linkData.shortcutId === undefined && linkData.appId === undefined) {
                throw "no shortcut-id or/and app-id in the element";
            }
            returnedData = this.collectionApps.get(linkData.appId).toJSON();
            returnedData.shortcut = returnedData.shortcuts[linkData.shortcutId];
            returnedData.imageURL = location.origin + returnedData.imageURL;
            return returnedData;
        }
    });
});