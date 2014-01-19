var path = require('path')
  , nconf = require('nconf')
  , host = require('./host');

// configure the application using environment variables while falling back to the confg.json.
nconf.env().file(path.join(__dirname, 'config', 'config.json'));
// run the web application
host.open();