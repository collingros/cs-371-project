var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var user = mongoose.model('UserSchema');

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'usr[password]'
}, function (email, password, done) {
    user.findOne({email: email}).then(function(user) {
        if (!user || !user.validatePassword(password)){
            return done(null, false, {error: {'email or password': 'is not valid'}});
        }
        return done(null, user);
    }).catch(done);
}));