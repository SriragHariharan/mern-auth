const cloudinary = require('cloudinary').v2;
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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
            const userObj = new User({username, email, password:hashedPassword});
            delete userObj.confirmPassword;
            let newUser = await userObj.save();
            //generate jwt access and refresh
            // const accessToken = createAccessToken(newUser._id, newUser.username);
            // const refreshToken = createRefreshToken(newUser._id, newUser.username); 
            // res.cookie("accessToken",accessToken, {httpOnly: true, maxAge:process.env.ACCESS_TOKEN_MAXAGE});
            // res.cookie("refreshToken",refreshToken, {httpOnly: true, maxAge:process.env.REFRESH_TOKEN_MAXAGE});
            const accessToken = jwt.sign({username:newUser.username, userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
            res.json({success:true, message:"User signup successfull", data:{username:newUser.username, userId: newUser._id, token:accessToken}})  //send success response on user login 
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
                // const accessToken = createAccessToken(userDetails._id, userDetails.username);
                // const refreshToken = createRefreshToken(userDetails._id, userDetails.username); 
                // res.cookie("accessToken",accessToken, {httpOnly: true, maxAge:process.env.ACCESS_TOKEN_MAXAGE});
                // res.cookie("refreshToken",refreshToken, {httpOnly: true, maxAge: process.env.REFRESH_TOKEN_MAXAGE});
                // return res.json({success:true, message:"Welcome back", data:{username:userDetails.username, userID:userDetails._id}})
                
                const accessToken = jwt.sign({username:userDetails.username, userId: userDetails._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
                res.json({success:true, message:"User signup successfull", data:{username:userDetails.username, userId: userDetails._id, token:accessToken}})  //send success response on user login 

            }
        }  
    } catch (error) {
        console.log(error);
        return res.json({success:false, message:error.message, data:{} }) //error message
    }
}


//get user details
const getProfileDetails = async(req,res) => {
    try {
            let user = await User.findOne({_id:req.userID}, {password:0});
            return res.status(200).json({success:true, message:"",data:{user}})
    } catch (error) {
        return res.status(401).json({success:false, error_code:400, message:error.message, data:{} })
    }
}

//to upload image
const uploadImage = (req, res) => {
    try {
        if(!req.body.file) return res.status(204).json({success:false, error_code:204, message:"No file to upload", data:{} })

        //upload to cloudinary
        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        cloudinary.uploader.upload(req.body.file,
            { folder: "MERN_AUTH" }, 
            async function(error, result) {
                if(error) throw new Error(error)
                else {
                    console.log(result);
                    await User.updateOne({_id:req.userID}, {$set:{profile_pic:result.secure_url}});
                    return res.status(201).json({success:true, message:"Profile picture updated", data:{imageURL: result.secure_url} })
                } 
            } 
        );
    } catch (error) {
        console.log("img-upload error",error.message);
        return res.status(500).json({ success:false, error_code:500, message:error.message, data:{} })
    }
}

module.exports = {
    registerUser,
    loginUser,
    getProfileDetails,
    uploadImage,
}