const jwt = require('jsonwebtoken');


const adminAuthMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
        if (!token) {
            throw new Error('Authentication failed!');
        }
        const verified = jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET);
        req.adminEmail = verified.email;  
        next();
    } catch (error) {
        return res.json({success:false, message:error.message, error_code:404, data:{}})
    }        
}

module.exports = {
    adminAuthMiddleware
}