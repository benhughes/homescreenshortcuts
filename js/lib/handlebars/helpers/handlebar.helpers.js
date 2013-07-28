Handlebars.registerHelper('customBuilder', function (data, i) {
    "use strict";
    var html = "";
    switch (data.type) {
    case 'text':
        html = "<li><label>" + Handlebars.Utils.escapeExpression(data.label) + "</label>" +
            "<input data-customid=\"" + data.customid +  "\" class=\"custom customText\" type=\"text\"/>" +
            "<span class=\"help\">" + Handlebars.Utils.escapeExpression(data.help) + "</span></li>";
        break;
    default :
        break;
    }
    return html;
});