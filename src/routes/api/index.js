var users = require('./users');
/**
 * Configures the api routes.
 * @param {object} app the express application.
 */
module.exports.configure = function (app) {
    app.get('/api/users/:username', users.getUserById);
}