var DemockRequest = require('./request'),
    DemockResponse = require('./response'),
    serveStatic = require('serve-static');

module.exports = function (options) {
    var staticMiddleWare = serveStatic(options.static.root, options.static.options);

    return function (httpRequest, httpResponse, next) {
        if (httpRequest.url.indexOf(options.jsonPath) !== 0) {
            return next();
        }

        var demockRequest = DemockRequest(httpRequest),
            demockResponse = new DemockResponse(demockRequest, httpResponse, {
                ignoreMime: options.ignoreMime
            });

        staticMiddleWare(demockRequest, demockResponse, next);
    };
};
