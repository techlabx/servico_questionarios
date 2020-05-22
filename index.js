'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

var whitelist = ['*']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
// App
const app = express();

//Configure routes
const api = require('./api');

//Configure middleware
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Add these routes to the middleware stack
app.use('/', api);

// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://localhost:${PORT}`);