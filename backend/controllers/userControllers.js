
const asyncHandler = require('express-async-handler')
const User = require("../middlewares/models/userModel");
const generateToken = require('../utils/generateToken');


const registerUser = asyncHandler(async(req,res)=>{
    const{ name ,email ,password, mobno,batch ,city,dob ,aadhar} =req.body;
    
    const userExists =await User.findOne({ email});
   
    if(userExists){
        res.status(400);
        throw new Error('user already Exists');
       }
       
    const user = await User.create({
        name,
        email,
        password,
        mobno,
        batch,
        city,
        aadhar,
        dob,
    });
       
       if(user){

        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            mobno:user.mobno,
            batch:user.batch,
            city:user.city,
            aadhar:user.aadhar,
            token:generateToken(user._id),

        });
    }
    
    else{
        res.status(400)
        throw new Error("error Occured");
    }
   
    
});


const authUser = asyncHandler(async(req,res)=>{
    const{email ,password} =req.body;
    
const user = await User.findOne({"email":email});

if(user &&(await user.matchPassword(password))){

    res.json({

        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        mobno:user.mobno,
        batch:user.batch,
        city:user.city,
        dob:user.dob,
        aadhar:user.aadhar,
        token:generateToken(user._id),



    });
}
   else{
    res.status(400)
    throw new Error("invalid Email Or Password");
}
   
    
});


module.exports={registerUser,authUser}