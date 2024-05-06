const { verifyJWToken, createAdminAccessToken, createAdminRefreshToken, createAccessToken, createRefreshToken } = require('../helpers/jwtHelper');

const userAuthMiddleware = (req, res, next) => {
    try {
        console.log("whole cookies :::",req.cookies);
        let accessToken = req.cookies.accessToken;
        let refreshToken = req.cookies.refreshToken
        
        if(!accessToken && !refreshToken){
            console.log("No ax and rf token")
            throw new Error("Session expired. Login to continue")
        }
        else if(!accessToken && refreshToken){
            try {
                console.log("No ax but rf token")
                verifyJWToken(refreshToken, process.env.REFRESH_TOKEN_SECRET )
                .then(resp => {
                    console.log(resp.userID, resp.username);
                    const newAccessToken = createAccessToken(resp.userID, resp.username);
                    const newRefreshToken = createRefreshToken(resp.userID, resp.username);
                    res.cookie("accessToken",newAccessToken, {httpOnly: true, maxAge:process.env.ACCESS_TOKEN_MAXAGE});
                    res.cookie("refreshToken",newRefreshToken, {httpOnly: true, maxAge: process.env.REFRESH_TOKEN_MAXAGE});
                    req.userData={
                        userID:resp.userID,
                        username:resp.username
                    }
                    next();
                })
                //after validating refresh token, send a new ax & rf token
            } 
            catch (error) {
                throw new Error(error.message);
            }
        }else if(accessToken && refreshToken){
            try {
                console.log("ax and rf token");
                verifyJWToken(accessToken, process.env.ACCESS_TOKEN_SECRET )
                verifyJWToken(refreshToken, process.env.REFRESH_TOKEN_SECRET )
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
    userAuthMiddleware
}