# demock-express

Express middleware for Demock

# Usage

```
var express = require('express'),
    bodyParser = require('body-parser'),
    demock = require('demock-express');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(demock({
    jsonPath: 'api',
    static: {
        root: __dirname
    }
}));
```
