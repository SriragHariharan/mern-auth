
const userAuthMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('Authentication failed!');
        }
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userID = verified.userID;
        req.username = verified.username;  
        next();
    } catch (error) {
        return res.json({success:false, message:error.message, error_code:404, data:{}})
    }        
}

module.exports = {
    userAuthMiddleware
}