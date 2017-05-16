const url = require('url');

exports.moment = require('moment');

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2);


exports.fullUrl = (req, pathname, query) => url.format({ protocol: req.protocol, host: req.get('host'), pathname, query });