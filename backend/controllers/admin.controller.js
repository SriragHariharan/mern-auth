const bcrypt = require('bcrypt');
const User = require('../models/User.model');
const jwt = require('jsonwebtoken')


//admin login route
const loginAdmin = async(req, res) => {
    try {
        console.log(req.body);
        if(req.body.email !== process.env.ADMIN_EMAIL){
            throw new Error("Invalid credentials")
        }
        let comparedPassword = await bcrypt.compare(req.body.password, process.env.ADMIN_PASSWORD);
        if(!comparedPassword){
            throw new Error("Invalid credentials")
        }else{
            //const accessToken = createAdminAccessToken(process.env.ADMIN_EMAIL);
            //const refreshToken = createAdminRefreshToken(process.env.ADMIN_EMAIL);
            //res.cookie("adminAccessToken",accessToken, {httpOnly: true, maxAge:process.env.ACCESS_TOKEN_MAXAGE});
            //res.cookie("adminRefreshToken",refreshToken, {httpOnly: true, maxAge: process.env.REFRESH_TOKEN_MAXAGE});
            
            const accessToken = jwt.sign({email:req.body.email}, process.env.ADMIN_ACCESS_TOKEN_SECRET, {expiresIn: '10m'});
            return res.json({success:true, message:"Admin loggedin successfully", data:{token:accessToken} })
        } 
    } 
    catch (error) {
        console.log(error);
        return res.json({sucess:false, status_code:401, message:error.message, data:{} })
    }
}


//admin add New User
const addNewUser = async(req, res) => {
    try {
        const {username, email, password, confirmPassword} = req.body;
        console.log(req.body);
        const existingUser = await User.findOne({email});
        if(existingUser){
            throw new Error("User already exists")
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            delete confirmPassword;
            const newUser = new User({username, email, password:hashedPassword});
            await newUser.save();
            return res.status(201).json({success:true, message:"Added new User", data:{_id:newUser._id, username:newUser.username, email:newUser.email} })
        }
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({success:false, status_code:400, message:error.message, data:{}})
    }
}

//update existing user details
const updateExistingUser = async(req, res) => {
    try {
        console.log(req.body)
        const userID = req.params.id;
        const existingUser = await User.findOne({_id:userID});
        if(!existingUser){
            throw new Error("User not found")
        }else{
            let updatedUser = await User.updateOne({_id:userID}, {$set:{...req.body}});
            return res.status(201).json({ success:true, message:"Details updated", data:{username:updatedUser.username, email: updatedUser.email} });
        }
    } catch (error) {
        return res.status(404).json({success:false, status_code:400, message:error.message, data:{}})
    }
}

//delete existing user
const deleteExistingUser = async(req, res) => {
    try {
        const userID = req.params.id;
        let resp = await User.deleteOne({_id:userID});
        if(resp.acknowledged = true && resp.deletedCount == 1){
            return res.status(201).json({ success:true, message:"User deleted", data:{} });
        }else{
            throw new Error("User not found")
        }
    } catch (error) {
        return res.status(400).json({success:false, status_code:400,message:error.message, data:{} })
    }
}

//get all users
const getAllUsers = async(req, res) => {
    try {
        let allUsers = await User.find({});
        return res.status(200).json({success:true, message:"Data fetched", data:{users: allUsers}})
    } catch (error) {
        return res.status(500).json({success:false, status_code:400,message:"Unable to fetch", data:{} })
    }
}

//get single user details
const getSingleUserDetails = async(req, res) => {
    try {
        let userID = req.params.id;
        let singleUser = await User.findOne({_id:userID}, {password:0});
        return res.status(200).json({success:true, message:"Data fetched", data:{user: singleUser}})
    } catch (error) {
        return res.status(500).json({success:false, status_code:400,message:"Unable to fetch", data:{} })
    }
}

module.exports = {
    loginAdmin,
    addNewUser,
    updateExistingUser,
    deleteExistingUser,
    getAllUsers,
    getSingleUserDetails,
}