define([
    'log',
    'collection.apps',
    'model.app',
    'text!/templates/single.app.html',
    'text!/templates/shortcut.html'
], function (log, collectionApps, modelApp, singleAppTemplate, shortcutTemplate) {
    'use strict';
    return Backbone.View.extend({
        logPrefix: "views.app",
        className: 'main',
        appModel: null,
        $mainContainer: null,
        collectionApps: null,
        customSettings: {},
        templates: {},
        cache: {},
        initialize: function () {
            log(this.logPrefix, 'initializing with id', this.id);
            this.$mainContainer = $('#mainContainer').addClass('loading');
            this.appModel = new modelApp({id: this.id});
            this.collectionApps = collectionApps;
            this.setUpTemplates();
            this.bindEvents();
            this.appModel.fetch();
            this.render();
        },
        setUpTemplates: function () {
            //set up templates
            this.templates.singleAppTemplate = Handlebars.compile(singleAppTemplate);
            this.templates.shortcutTemplate = Handlebars.compile(shortcutTemplate);

            //set up templates cache
            this.cache.singleAppTemplate = "";
            this.cache.shortcutTemplate = "";
        },
        events: {
            'click #singleAppContainer ul.shortCuts a.createShortcut': 'handleAppLinkCLick',
            'change #singleAppContainer ul.optionsList input': 'handleOptionChange'
        },
        bindEvents: function () {
            this.appModel.on('change', $.proxy(this.render, this));
        },
        render: function () {
            var data, html;
            data = this.appModel.toJSON();
            html = this.templates.singleAppTemplate(data);
            if (html !== this.cache.singleAppTemplate) {
                this.el.innerHTML = html;
                this.$mainContainer.html(this.el);
                this.cache.singleAppTemplate = html;
            }
        },
        handleAppLinkCLick: function (e) {
            log(this.logPrefix, 'handleAppLinkCLick');
            var linkData = $(e.target).data(),
                shortcutData, html;
            e.preventDefault();
            log(this.logPrefix, 'detecting click on app link');
            shortcutData = this.prepareShortcutData(linkData);
            html = 'data:text/html;charset=UTF-8,' + this.templates.shortcutTemplate(shortcutData);
            location.href = html;
        },
        generateCustomShortCuts: function (data) {
            var shortcutData = data.shortcut;
            console.log(data);
            if (shortcutData.action.match('{{(.*?)}}')) {
                var template = Handlebars.compile(shortcutData.action),
                    customSettings = this.customSettings[shortcutData.id] || {};

                shortcutData.action = template(customSettings);
            }
            return data;

        },

        prepareShortcutData: function (linkData) {
            var returnedData;
            if (linkData.shortcutId === undefined && linkData.appId === undefined) {
                throw "no shortcut-id or/and app-id in the element";
            }
            returnedData = this.collectionApps.get(linkData.appId).toJSON();
            returnedData.shortcut = returnedData.shortcuts[linkData.shortcutId];
            returnedData.imageURL = location.origin + returnedData.imageURL;
            returnedData = this.generateCustomShortCuts(returnedData);
            return returnedData;
        },
        handleOptionChange: function (e) {
            var $thisEl = $(e.target),
                optionId = $thisEl.data('customid'),
                shortcutID = $thisEl.closest('li.shortcut').data('shortcut-id');

            if (this.customSettings[shortcutID]) {

                this.customSettings[shortcutID][optionId] = $thisEl.val();
            } else {

                this.customSettings[shortcutID] = {};
                this.customSettings[shortcutID][optionId] = $thisEl.val();
            }

        }
    });
});