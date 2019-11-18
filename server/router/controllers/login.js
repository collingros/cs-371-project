const user = require('../../models/user');
const passport = require('passport');

exports.login = (req, res, next) => {
    if (!req.body.user.email) {
        return res.status(422).json({errors: {email: "cannot be left blank"}});
    }
    if (!req.body.user.password) {
        return res.status(422).json({ errors: {password: "cannot be left blank"}});
    }

    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: 'Invalid username or password'},function(err, user, info) {
        if (err) { return next(err); }
        if (user) {
            user.token = user.generateJWT();
            return res.json({user: user.toAuthJSON()});
        }
        else {
            return res.status(422).json(info);
        }
    });
};