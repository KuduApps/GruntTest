/**
 * @module host responsible for creating express and listening on the configured port.
 */

var express = require('express');
var http = require('http');
var path = require('path')
  , nconf = require('nconf');

/**
 * opens the host
 */
module.exports.open = function () {
    var app = express();
    // all environments
    app.set('port', nconf.get('PORT') || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));

    // development only
    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    }

    // configure the api routes.
    require('./routes/api').configure(app)
    // configure the site routes.
    require('./routes/site').configure(app);

    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
}