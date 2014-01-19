var when = require('when')
  , Users = require('../model/users');

/**
 * Membership class
 * @class
 * @classdesc Responsible for user authentication and authorization.
 */
function Membership() { }
/**
 * Authenticates the user against the datastore
 * @param {string} username - the username to authenticate.
 * @param {string} password - the password.
 */
Membership.prototype.authenticate = function (username, password) {
    return when.reject(new Error('This method is not implemented.'));
};
/**
 * Registers the user
 * @param {object} registration - the registration data
 */
Membership.prototype.register = function (registration) {
    var users = new Users();

    // todo - handle user validation, salt password, etc.
    return users.fetch(registration.username)
        .then(function (user) {
            if (user) {
                return when.reject(new Error('The user already exists in the database.'));
            }
        });
};

module.exports = Membership;