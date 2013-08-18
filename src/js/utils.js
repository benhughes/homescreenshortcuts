define([], function () {
    return {
        isURI: function (URI) {
            return URI.match('://') !== null
        },
        navigateTo: function (url) {
            location.href = url;
        }
    }
})