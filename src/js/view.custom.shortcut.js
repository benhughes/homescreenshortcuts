define([
    'log',
    'utils',
    'text!../templates/customShortcutView.html',
    'text!../templates/shortcut.html'
], function (log, utils, customShortcutTemplate, shortcutTemplate) {
    'use strict';

    return Backbone.View.extend({
        logPrefix: 'view.custom.shortcut',
        $mainContainer: null,
        defaultImageShortcutUrl: '/img/app-icons/instagram-175x175.jpg',
        templates: {
            customShortcutTemplate: Handlebars.compile(customShortcutTemplate),
            shortcutTemplate: Handlebars.compile(shortcutTemplate)
        },
        events: {
            'click a.createShortcut': 'handleAppLinkCLick',
            'change input.shortcut-uri': 'handleOptionChange'
        },
        initialize: function () {
            log(this.logPrefix, 'initializing....');
            this.$mainContainer = $('#mainContainer').addClass('loading');
            this.render();
        },
        render: function () {
            var pageDefualts = {
                action: ''
                },
                settings = $.extend(pageDefualts, (this.options.urlParams) ? this.options.urlParams : {});
            this.el.innerHTML = this.templates.customShortcutTemplate(settings);
            this.$mainContainer.html(this.el);
        },
        handleAppLinkCLick: function (e) {
            var URI = $(this.el).find('input.shortcut-uri').val();
            log(this.logPrefix, 'user is creating a custom shortcut using ', URI);
            e.preventDefault();
            if (utils.isURI(URI)) {
                this.navigateToShortcutPage(URI);
            } else {
                alert(URI + ' is not a URI');
            }

        },
        navigateToShortcutPage: function (URI) {
            var shortcutData = this.generateShortcutData(URI),
                html = 'data:text/html;charset=UTF-8,' + this.templates.shortcutTemplate(shortcutData);
            log(this.logPrefix, 'navigating user to shortcut page', html);
            utils.navigateTo(html);
        },
        generateShortcutData: function (URI) {
            return {
                imageURL: location.origin + this.defaultImageShortcutUrl,
                shortcut:{
                    "name": "custom",
                    "action": URI
                }

            }

        },
        handleOptionChange: function (e) {
            var URI = $(e.target).val();
            $(this.el).find('a.testShortcut').attr('href', URI);
        }
    });
});