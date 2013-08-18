define([], function () {
    return {
        isURI: function (URI) {
            return URI.match('://') !== null
        }
    }
})