require('dotenv').config();

const jwt = require('jsonwebtoken');
const token_secret = process.env.ACCESS_TOKEN_SECRET;

function authenticateToken(req, res, next) {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1]

    // if (token == null) return res.sendStatus(401)

    // jwt.verify(token, token_secret, (err, user) => {
    //     if (err) return res.sendStatus(401);
    //     req.user = user
    //     console.log(user)
    //     next()
    // })

    next()
}

module.exports = {
    authenticateToken,
}
  