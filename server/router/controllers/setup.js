const User = require('../../models/user');
const nrf24 = require('nrf24');

exports.setup = (req, res, next) => {

    const user = await User.findById(userId).exec();

    if (!user.isAdmin) return;

};