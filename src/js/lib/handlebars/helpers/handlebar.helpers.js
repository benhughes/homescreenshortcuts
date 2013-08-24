Handlebars.registerHelper('customBuilder', function (data, i) {
    "use strict";
    var html = "";
    switch (data.type) {
    case 'text':
        html = "<li>" +
            "<input data-customid=\"" + data.customid +  "\" class=\"custom customText form-control\" placeholder=\"" + Handlebars.Utils.escapeExpression(data.label) + "\" type=\"text\"/>" +
            "<span class=\"help-block\">" + Handlebars.Utils.escapeExpression(data.help) + "</span></li>";
        break;
    default :
        break;
    }
    return html;
});

Handlebars.registerHelper('encode', function (data, i) {
    "use strict";
    return Handlebars.Utils.escapeExpression(encodeURI(data));
});