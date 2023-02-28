const JWT = require('jsonwebtoken');
const UserLogin = require('../models/UserSchema');

const login = async (req , res)=>{
 try {
  const {email , password} = req.body;
  if(!email || !password){
   return res.status(400).json({
    msg : 'Please provide email and password'
   })
  }
  const token = JWT.sign({email} , process.env.JWT_SECRET , {expiresIn : '10d'})
  if(!token){
   return res.status(400).json({
    msg : 'Invalid credentials , please try again'
   })
  }
  const User = await UserLogin.find({
   email:email , 
   password:password
  })
  res.status(201).json({
   msg : 'User loged successfully',
   userInfo: User
  })
 } catch (error) {
  return res.status(500).json({
   msg : error.message
  })
 }
}

const register = async (req , res)=>{
 try {
  const {email , password , confirmPassword} = req.body;
  if(!email || !password || !confirmPassword){
   return res.status(400).json({
    msg : 'Please provide email and password'
   })
  }
  if(confirmPassword !== password){
   return res.status(403).json({
    msg : 'Passwords do not match , please try again'
   })
  }
  const token = JWT.sign({email} , process.env.JWT_SECRET , {expiresIn : '10d'})
  if(!token){
   return res.status(400).json({
    msg : 'Invalid credentials , please try again'
   })
  }
  const User = await UserLogin.create({
   email:email , 
   password:password
  })
  res.status(201).json({
   msg : 'User created successfully',
   userInfo: User
  })
 } catch (error) {
  return res.status(500).json({
   msg : error.message
  })
 }
}

module.exports = {
 register , login 
}
