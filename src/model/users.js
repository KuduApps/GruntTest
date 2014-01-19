var when = require('when')
  , nodefn = require('when/node/function')
  , azure = require('azure')
  , nconf = require('nconf');

var tableService = azure.createTableService(nconf.get('AZURE_STORAGE_ACCOUNT'), nconf.get('AZURE_STORAGE_ACCESS_KEY'));

tableService.createTableIfNotExists('users', function (err) {
    if (err) {
        throw err;
    }
});

/**
 * The Users class.
 * @class
 */
function Users() { }

/**
 * Gets the user by the provided username.
 * @param {string} username - the name of the user
 * @return {Promise} Promise
 */
Users.prototype.get = function (username) {
    var deferred = when.defer();
    tableService.queryEntity('users', 'users', username, function (err, entity) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(entity);
        }
    });
    return deferred.promise;
};

/**
 * Tries to get the user by the provided username.
 * @param {string} username - the name of the user
 * @return {Promise} Promise
 */
Users.prototype.fetch = function (username) {
    var deferred = when.defer();

    this.get(username)
        .done(function (user) {
            return deferred.resolve(user);
        }, function (err) {
            if (err.statusCode !== 404) {
                return deferred.reject(err);
            } else {
                return deferred.resolve();
            }
        });

    return deferred.promise;
};

module.exports = Users;