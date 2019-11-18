var jwt = require('express-jwt');

function getTokenHeader(req){
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
        req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

var authenticate = {
  required: jwt({
      userProperty: 'payload',
      getToken: getTokenHeader
  }),
    optional: jwt({
        userProperty: 'payload',
        credentialsRequired: false,
        getToken: getTokenHeader
    })
};

module.exports = authenticate;