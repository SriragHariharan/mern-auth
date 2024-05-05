const jwt = require('jsonwebtoken');
const algorithm = 'HS256';

const createAccessToken = (userID, username)=> {
    const payload = {
        userID,
        username,
        exp: Math.floor(Date.now() / 1000) + 60, //after 1 mins
        iat: Math.floor(Date.now() / 1000)
    };

    const secretKey = process.env.ACCESS_TOKEN_SECRET;

    return jwt.sign(payload, secretKey, { algorithm });
}

const createRefreshToken = (userID, username)=> {
    const payload = {
        userID,
        username,
        exp: Math.floor(Date.now() / 1000) + 90, //after 1.5 mins
        iat: Math.floor(Date.now() / 1000)
    };

    const secretKey = process.env.REFRESH_TOKEN_SECRET;
    
    return jwt.sign(payload, secretKey, { algorithm });
}

module.exports = {
    createAccessToken,
    createRefreshToken,
}