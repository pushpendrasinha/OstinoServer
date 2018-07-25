var constants = require('../util/constant-util');
var config = require('../util/config-util');
var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {

    var token = req.headers['authorization'];
    console.log(token);
    if (!token)
        return res.status(403).send({
            success: false,
            message: constants.TOKEN_NOT_PROVIDED
        });

    jwt.verify(token, config.nodeConfig.get('secret'), function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        console.log("decoded result is " + JSON.stringify(decoded, null, 2));
        req.userId = decoded.id;
        next();
      //  res.status(200).send(decoded);
    });
}
module.exports = verifyToken;