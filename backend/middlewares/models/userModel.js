const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required:true,
    },
    mobno:{
        type:Number,
        required:true,
    },
    batch:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    dob:{
        type:String,
        required:true,
    },
    aadhar:{
        type:Number,
        required:true,
    },
},
{
    timestamp:true,
}
);
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
});

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

const User = mongoose.model('User',userSchema);

module.exports= User;