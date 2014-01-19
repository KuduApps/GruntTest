var home = require('./home');

/**
 * Configures the site routes.
 * @param {object} app the express application.
 */
module.exports.configure = function (app) {
    app.get('/', home.index);
}