define(function (require) {
    'use strict';
    var utils = require('utils'),
        log = require('log');
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
            var modelApp = require('model.app');
            log(this.logPrefix, 'initializing with id', this.id);
            this.el = $('#mainContainer').addClass('loading');
            this.appModel = new modelApp({id: this.id});
            this.collectionApps = require('collection.apps');
            this.setUpTemplates();
            this.appModel.fetch();
            this.render();
            this.bindEvents();
        },
        setUpTemplates: function () {
            //set up templates
            this.templates.singleAppTemplate = Handlebars.compile(require('text!../templates/single.app.html'));
            this.templates.shortcutTemplate = Handlebars.compile(require('text!../templates/shortcut.html'));

            //set up templates cache
            this.cache.singleAppTemplate = "";
            this.cache.shortcutTemplate = "";
        },
        bindEvents: function () {
            this.appModel.on('change', $.proxy(this.render, this));
            this.el
                .on('click', 'ul.shortCuts a.createShortcut', $.proxy(this.handleAppLinkCLick, this))
                .on('change', 'ul.optionsList input', $.proxy(this.handleOptionChange, this));
        },
        render: function () {
            var data, html;
            data = this.appModel.toJSON();
            html = this.templates.singleAppTemplate(data);
            if (html !== this.cache.singleAppTemplate) {
                this.el[0].innerHTML = html;
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
            utils.navigateTo(html);
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
            log(this.logPrefix, 'change detected');
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