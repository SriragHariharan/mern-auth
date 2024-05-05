const jwt = require('jsonwebtoken');
const algorithm = 'HS256';

//create access token for user
const createAccessToken = (userID, username)=> {
    const payload = {
        userID,
        username,
    };

    const secretKey = process.env.ACCESS_TOKEN_SECRET;

    return jwt.sign(payload, secretKey, { algorithm });
}

//create refresh token for user
const createRefreshToken = (userID, username)=> {
    const payload = {
        userID,
        username,
    };

    const secretKey = process.env.REFRESH_TOKEN_SECRET;
    
    return jwt.sign(payload, secretKey, { algorithm });
}


//create access token for admin
const createAdminAccessToken = (adminEmail)=> {
    const payload = adminEmail;

    const secretKey = process.env.ADMIN_ACCESS_TOKEN_SECRET

    return jwt.sign(payload, secretKey, { algorithm });
}

//create access token for admin
const createAdminRefreshToken = (adminEmail) => {
    const payload = adminEmail

    const secretKey = process.env.ADMIN_REFRESH_TOKEN_SECRET

    return jwt.sign(payload, secretKey, { algorithm });
}


//verifying access token 
const verifyJWToken = (token, tokenSecret) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, tokenSecret, (error, decoded) => {
            if(error){
                throw new Error("Session expired. Login to continue");
            }else{
                resolve(decoded);
            }
        });
        } catch (error) {
            reject(error.message);
        }
    })
}


module.exports = {
    createAccessToken,
    createRefreshToken,
    createAdminAccessToken,
    createAdminRefreshToken,
    verifyJWToken,
}