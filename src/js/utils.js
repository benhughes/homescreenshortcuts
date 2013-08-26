define(function () {
    return {
        isURI: function (URI) {
            return typeof URI == 'string' && URI.match('://') !== null
        },
        navigateTo: function (url) {
            location.href = url;
        },
        convertParamsToObject: function (params) {
            var returnedObject = {}, i,
                paramsArray = (typeof params === 'string') ? params.split(/&(?!(?:apos|quot|[gl]t|amp);|#)/) : [];

            for (i = 0; i < paramsArray.length; i++) {
                var param = paramsArray[i].split('=');
                if (param.length === 2) {
                    returnedObject[param[0]] = param[1];
                } else if (param.length > 2) {
                    returnedObject[param.reverse().pop()] = param.reverse().join('=');
                }

            }

            return returnedObject;
        }
    }
});