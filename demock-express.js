var filterRequest = require('./filterRequest'),
    DemockResponse = require('./response');

module.exports = function (staticMiddleWare, options) {
    return function (httpRequest, httpResponse, next) {
        if (!options.jsonPath || httpRequest.url.indexOf('/' + options.jsonPath) === 0) {
            httpRequest = filterRequest(httpRequest);

            httpResponse = new DemockResponse(httpRequest, httpResponse, {
                ignoreMime: options.ignoreMime
            });
        }

        staticMiddleWare(httpRequest, httpResponse, next);
    };
};
