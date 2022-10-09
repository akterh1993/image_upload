const User = require("../models/user.models");
const bcryptjs = require('bcryptjs');
const config = require("../config/config");
const jwt = require("jsonwebtoken");


const createToken = async(id)=>{
    try {
        const token = await jwt.sign({_id:id},config.secret_key);
        return token;
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const securePassword = async(password)=>{
    try {
      const passwordHash = await bcryptjs.hash(password,10);
      return passwordHash;
    } catch (error) {
        res.status(400).send(error.message);
    }
}



const getAllUsers = async(req, res)=> {
    try {
        const users = await User.find()
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const getOneUser = async(req, res, next)=>{
    try {
        const user = await User.findOne({id: req.params.id});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error.message);
        
    }
};
const createUser = async(req, res)=>{
    try {
        const spassword = await securePassword(req.body.password);
        const newUser = new User({
            name: req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
            password: spassword,
            image: req.file.filename,
            type: req.file.type,
    
        });
        const userData = await User.findOne({mobile:req.body.mobile});
        
        if(userData){
            res.status(200).send({success:false, msg:"This email/mobile no is Already exist"})
        }else{
            await newUser.save();
            res.status(201).json(newUser);
        }
        
    } catch (error) {
        res.status(500).send(error.message);
        
    }
};
const updateUser = async(req, res)=>{
    try {
        const spassword = await securePassword(req.body.password);
        const user = await User.findOne({id: req.params.id});
        user.name = req.body.name;
        user.mobile = req.body.mobile;
        user.email = req.body.email;
        user.password = spassword;
        user.image = req.file.filename;
        user.type = req.file.type;

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error.message);
        
    }
};
const deleteUser = async(req, res)=>{
    try {
        await User.deleteOne({id: req.params.id});
        res.status(200).json({message: "User is delated"});
    } catch (error) {
        res.status(500).send(error.message);
        
    }
};

const login = async(req, res)=>{
    try {
        const  email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({email:email});
        if (userData) {
            const passwordMatch = await bcryptjs.compare(password,userData.password);
            if (passwordMatch) {
                const tokenData = await createToken(userData._id);
                const userResult ={
                    _id: userData._id,
                    name:userData.name,
                    mobile:userData.mobile,
                    email:userData.email,
                    password:userData.password,
                    image:userData.image,
                    type:userData.type,
                    token:tokenData,
                }
                const response ={
                    success:true,
                    msg:"User Details",
                    data:userResult
                }
                res.status(200).send(response);
                
            } else {
                res.status(200).send({success:false, msg:"Password incorrect"});
            }
            
        } else {
            res.status(200).send({success:false, msg:"email or password incorrect"});
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};


module.exports = { getAllUsers, getOneUser, createUser, updateUser, deleteUser, login };