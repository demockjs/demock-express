var demock = require('demock'),
    http = require('http');

module.exports = function () {
    return function (req, res, next) {
        var params;

        switch (req.method) {
        case 'GET':
            params = req.query;
            break;
        case 'POST':
        case 'PUT':
            params = req.body;
            break;
        }

        var request = {
            method: req.method,
            url: req.url,
            params: params
        };

        console.log('BEFORE', request);
        demock.filterRequest(request);
        console.log('AFTER', request);

        req.method = request.method;
        req.url = request.url;

        // @todo: apply params back?
        // switch (request.method) {
        // case 'GET':
        //     break;
        // case 'POST':
        // case 'PUT':
        //     break;
        // }

        // @todo: get static file

        var response = {
            statusCode: res.statusCode,
            statusText: http.STATUS_CODES[res.statusCode]
            // @todo: grab JSON payload
        };

        console.log('BEFORE', request, response);
        while (demock.filterResponse(req.__request, response)) {}
        console.log('AFTER', request, response);

        res.statusCode = response.statusCode;
        // @todo: set status text
        // @todo: update JSON payload

        next();
    };
};
