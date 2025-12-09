const User= require('../models/user');
const { StatusCodes}= require('http-status-codes');
const {BadRequestError, UnauthenticatedError}= require('../errors');
//const bcrypt= require('bcryptjs');
const jwt=require('jsonwebtoken');

const register= async (req, res)=>{
    console.log('JWT_SECRET:', process.env.JWT_SECRET);

    //const {name, email, password}= req.body; 

    //const salt= await bcrypt.genSalt(10); //salt is used to enhance security of hashed password.geSalt method generates a salt with 10 rounds
    //const hashedPassword= await bcrypt.hash(password, salt);

    //const tempUser= {name, email, password: hashedPassword}

    const user= await User.create({...req.body});
    const token= user.createJWT();
    res.status(StatusCodes.CREATED).json({user:{name: user.name},token,});
}

const login= async (req, res)=>{
    const {email, password}= req.body;
    if(!email || !password){
        throw new BadRequestError('Please provide email and password');
    }
    const user= await User.findOne({email});
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials');
    }
    const isPasswordCorrect= await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials');
    }
    const token= user.createJWT();
    res.status(StatusCodes.OK).json({user:{name: user.name}, token,});
}
module.exports= {register, login};