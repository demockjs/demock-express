var DemockRequest = require('./request'),
    DemockResponse = require('./response'),
    serveStatic = require('serve-static');

module.exports = function (urlRoot, staticRoot, staticOptions) {
    var staticMiddleWare = serveStatic(staticRoot, staticOptions);

    return function (httpRequest, httpResponse, next) {
        if (httpRequest.url.indexOf(urlRoot) !== 0) {
            return next();
        }

        var demockRequest = DemockRequest(httpRequest),
            demockResponse = new DemockResponse(demockRequest, httpResponse);

        staticMiddleWare(demockRequest, demockResponse, next);
    };
};
