const jwt = require('jsonwebtoken');

const userAuthMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('Authentication failed!');
        }
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("vtkn",verified)
        req.userID = verified.userId;
        req.username = verified.username;  
        next();
    } catch (error) {
        console.log(error.message)
        return res.status(401).json({success:false, message:error.message, error_code:404, data:{}})
    }        
}

module.exports = {
    userAuthMiddleware
}