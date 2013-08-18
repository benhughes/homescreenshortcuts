define([], function () {
    return {
        isURI: function (URI) {
            return typeof URI == 'string' && URI.match('://') !== null
        },
        navigateTo: function (url) {
            location.href = url;
        }
    }
});