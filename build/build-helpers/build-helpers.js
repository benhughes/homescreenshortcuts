module.exports = {
    getLibList: function (htmlLocation) {
        var fs = require('fs'),
            path = require('path'),
            html = fs.readFileSync(htmlLocation, 'utf8'),
            $ = require('cheerio').load(html);

        var libs = [],
            basePath = path.dirname(htmlLocation),
            scripts = $('script'),
            script, src;

        for (var i = 0; i < scripts.length; i++) {
            script = $(scripts[i]);
            src = script.attr('src');
            if (src.match('js/lib')) {
                libs.push(basePath + '/' + script.attr('src'));
            }
        }
        return libs;
    },
    buildHtml: function (htmlLocation) {
        var fs = require('fs'),
            path = require('path'),
            html = fs.readFileSync(htmlLocation, 'utf8'),
            $ = require('cheerio').load(html);

        var removeScripts = function () {
            var scripts = $('script'),
                script, src;
            for (var i = 0; i < scripts.length; i++) {
                script = $(scripts[i]);
                src = script.attr('src');
                if (src) {
                    script.remove();
                }
            }

            var compiledScript = $('<script />');
            compiledScript.attr('src', 'lib.js');
            compiledScript.attr('data-main', 'r-main');
            $('head').append(compiledScript);
        };

        removeScripts();

        html = $.html();
        fs.writeFileSync(htmlLocation, html);


    }
};