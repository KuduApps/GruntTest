
/**
 * Gets the index page.
 */
exports.index = function (req, res) {
    res.render('home/index', { subtitle: 'Home' });
};