var Users = require('../../model/users')
  , Membership = require('../../services/membership');

/**
 * Gets the user using the provided username.
 */
module.exports.getUserById = function (req, res) {
    var users = new Users();
    var username = req.params.username;

    users.get(username)
        .done(function (user) {
            res.send(200, user);
        }, function (err) {
            res.send(err.statusCode, err);
        });
};