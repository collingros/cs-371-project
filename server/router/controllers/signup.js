const User = require('../../models/user');

exports.signup = async (req, res, next) => {

    let user =  await User.findOne({email: req.body.email });

    if (user) {
        return res.status(400).send("User already exists");
    } else {

        user = new User({
            username: req.body.user.username,
            email: req.body.user.email,
            firstName: req.body.user.firstName,
            lastName: req.body.user.lastName,
            phone: req.body.user.phone
        });
        user.setPassword(req.body.user.password);
    }
    await user.save()
    .then(function() {
        return res.json({ user: user.toAuthJSON()});
    }).catch(next);
};