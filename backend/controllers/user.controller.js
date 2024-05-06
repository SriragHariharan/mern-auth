const { createAccessToken, createRefreshToken } = require('../helpers/jwtHelper');
const User = require('../models/User.model');
const bcrypt = require('bcrypt');

//signup a new user
const registerUser = async(req, res) => {
    try {
        const {username, email, password, confirmPassword} = req.body;
        // console.log(req.body);
        const existingUser = await User.findOne({email});
        if(existingUser){
            throw new Error("User already exists");
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            delete confirmPassword;
            const userObj = new User({username, email, password:hashedPassword});
            let newUser = await userObj.save();
            //generate jwt access and refresh
            const accessToken = createAccessToken(newUser._id, newUser.username);
            const refreshToken = createRefreshToken(newUser._id, newUser.username); 
            res.cookie("accessToken",accessToken, {httpOnly: true, maxAge:process.env.ACCESS_TOKEN_MAXAGE});
            res.cookie("refreshToken",refreshToken, {httpOnly: true, maxAge:process.env.REFRESH_TOKEN_MAXAGE});
            res.json({success:true, message:"User signup successfull", data:{username:newUser.username, userId: newUser._id}})  //send success response on user login 
        }
    } catch (error) {
        console.log(error);
        return res.json({success:false, message:error.message, data:{} });
    }
}

//login new user
const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;
        const userDetails = await User.findOne({email})
        if(!userDetails){
            throw new Error("Wrong user credentials");
        }
        else{
            const passwordResp = await bcrypt.compare(password, userDetails?.password);
            if(!passwordResp){
                throw new Error("Wrong user credentials");
            }else{
                //generate jwt access and refresh
                const accessToken = createAccessToken(userDetails._id, userDetails.username);
                const refreshToken = createRefreshToken(userDetails._id, userDetails.username); 
                res.cookie("accessToken",accessToken, {httpOnly: true, maxAge:process.env.ACCESS_TOKEN_MAXAGE});
                res.cookie("refreshToken",refreshToken, {httpOnly: true, maxAge: process.env.REFRESH_TOKEN_MAXAGE});
                return res.json({success:true, message:"Welcome back", data:{username:userDetails.username, userID:userDetails._id}})
            }
        }  
    } catch (error) {
        console.log(error);
        return res.json({success:false, message:error.message, data:{} }) //error message
    }
}

//logout existing user 
const logoutUser = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

//get user details
const getProfileDetails = async(req,res) => {
    try {
        const {userID} = req.userData;
        if(userID !== req.body.userID){
            throw new Error("Unauthrized request")
        }else{
            let user = await User.findOne({_id:userID}, {password:0});
            return res.status(200).json({success:true, message:"",data:{user}})
        }
    } catch (error) {
        return res.json({success:false, error_code:400, message:error.message, data:{} })
    }
}

//to upload image
const uploadImage = (req, res) => {
    try {
        console.log(req.body);
    } catch (error) {
        console.log("img-upload error",error.message)
    }
}

module.exports = {
    registerUser,
    loginUser,
    getProfileDetails,
    uploadImage,
}