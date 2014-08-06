var demock = require('demock');

function DemockRequest(httpRequest) {
    var request = {
        method: httpRequest.method,
        url: httpRequest.url,
        params: httpRequest.method === 'GET'
            ? httpRequest.query
            : /^(POST|PUT)$/.test(httpRequest.method)
                ? httpRequest.body
                : {}
    };

    demock.filterRequest(request);

    httpRequest.method = request.method;
    httpRequest.url = request.url;
    httpRequest.originalUrl = request.url;
    httpRequest.params = request.params;

    return httpRequest;
}

module.exports = DemockRequest;
