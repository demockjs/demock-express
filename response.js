var util = require('util'),
    Transform = require('stream').Transform,
    mime = require('mime'),
    http = require('http'),
    demock = require('demock');

function DemockResponse(demockRequest, httpResponse, options) {
    Transform.call(this);

    this.getHeader = httpResponse.getHeader.bind(httpResponse);
    this.setHeader = httpResponse.setHeader.bind(httpResponse);
    this.removeHeader = httpResponse.removeHeader.bind(httpResponse);
    this.statusCode = httpResponse.statusCode;
    this._headers = httpResponse._headers;

    var chunks = [];

    this._transform = function (chunk, encoding, callback) {
        chunks.push(chunk);
        callback();
    };

    this._flush = function (callback) {
        var body = chunks.join('');

        if (body && (options.ignoreMime || this.getHeader('Content-Type').indexOf(mime.lookup('json')) === 0)) {
            try {
                var response = {
                    statusCode: this.statusCode,
                    statusText: http.STATUS_CODES[this.statusCode],
                    data: JSON.parse(body)
                };

                while (demock.filterResponse(demockRequest, response)) {}

                httpResponse.statusCode = response.statusCode;
                // @todo: set status text

                body = JSON.stringify(response.data);
            } catch (e) {}
        }

        this.push(body);
        this.setHeader('Content-Length', body.length);
        this.pipe(httpResponse);

        callback();
    };
}

util.inherits(DemockResponse, Transform);

module.exports = DemockResponse;
