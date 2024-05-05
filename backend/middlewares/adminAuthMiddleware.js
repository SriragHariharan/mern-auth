const { verifyJWToken, createAdminAccessToken, createAdminRefreshToken } = require('../helpers/jwtHelper');

const adminAuthMiddleware = (req, res, next) => {
    try {
        let accessToken = req.cookies.adminAccessToken;
        let refreshToken = req.cookies.adminRefreshToken
        console.log("whole cookies :::",req.cookies);

        if(!accessToken && !refreshToken){
            console.log("No ax and rf token")
            throw new Error("Session expired. Login to continue")
        }
        else if(!accessToken && refreshToken){
            try {
                console.log("No ax but rf token")
                verifyJWToken(refreshToken, process.env.ADMIN_REFRESH_TOKEN_SECRET )
                //after validating refresh token, send a new ax & rf token
                const newAccessToken = createAdminAccessToken(process.env.ADMIN_EMAIL);
                const newRefreshToken = createAdminRefreshToken(process.env.ADMIN_EMAIL);
                res.cookie("adminAccessToken",newAccessToken, {httpOnly: true, maxAge:process.env.ACCESS_TOKEN_MAXAGE});
                res.cookie("adminRefreshToken",newRefreshToken, {httpOnly: true, maxAge: process.env.REFRESH_TOKEN_MAXAGE});
                next();
            } 
            catch (error) {
                throw new Error(error.message);
            }
        }else if(accessToken && refreshToken){
            try {
                console.log("ax and rf token");
                verifyJWToken(accessToken, process.env.ADMIN_ACCESS_TOKEN_SECRET )
                verifyJWToken(refreshToken, process.env.ADMIN_REFRESH_TOKEN_SECRET )
                next();
            } catch (error) {
                throw new Error(error.message);   
            }
        }
        
    } catch (error) {
        console.log("errorMessage :",error.message)
        return res.status(401).json({success:false,status_code:401, message:error.message, data:{}})
    }
}

module.exports = {
    adminAuthMiddleware
}