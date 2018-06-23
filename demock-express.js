var Demock = require('demock'),
    filterRequest = require('./filterRequest'),
    DemockResponse = require('./response');

module.exports = function (staticMiddleWare, options) {
    var demock = new Demock();

    var middleware = function (httpRequest, httpResponse, next) {
        if (!options.jsonPath || httpRequest.url.indexOf('/' + options.jsonPath) === 0) {
            httpRequest = filterRequest(httpRequest, demock);

            httpResponse = new DemockResponse(httpRequest, httpResponse, {
                ignoreMime: options.ignoreMime
            }, demock);
        }

        staticMiddleWare(httpRequest, httpResponse, next);
    };

    middleware.use = function (demockMiddleware) {
        demock.use(demockMiddleware);
    };

    return middleware;
};
