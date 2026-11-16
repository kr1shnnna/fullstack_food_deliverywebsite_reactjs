import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import validator from "validator"


// login  user

const loginUser=async(req,res)=>{
const {email,password}=req.body;
try{
const user=await userModel.findOne({email});

if(!user){
        return res.json({success:false,message:'User does not exist'})
}
const isMatch=await bcrypt.compare(password,user.password);
if(!isMatch){
    return res.json({success:false,message:
        'Invalid credentials'})
    }
    const token=createToken(user._id);
    res.json({success:true,token})
}
catch(error){
    console.log(error);
    res.json({success:false,message:'Error in logging in user'})
}

}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)

}


//register user

const registerUser=async(req,res)=>{

    const {name,email,password}=req.body;
    try{
        //checking if user already exists
        const exists=await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:'User already exists'})
        }
        //validating email and strong password

        if(!validator.isEmail(email)){
            return res.json({success:false,message:'Please enter a valid email'})
        }

        if(password.length<8){
            return res.json({success:false,message:'Password must be atleast 8 characters long'})
        }

        //hashing user password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser= new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const  user= await newUser.save();
        const token=createToken(user._id);
        res.json({success:true,token})

    }
    catch(error){
console.log(error);
res.json({success:false,message:'Error in registering user'})
    }

}

const getProfile = async (req, res) => {
        try {
            const user = await userModel.findById(req.body.userId).select('-password -cartData');

            if (!user) {
                return res.json({success:false,message:'User not found'});
            }

            res.json({success:true,data:user});
        }
        catch(error){
            console.log(error);
            res.json({success:false,message:'Error while fetching profile'});
        }
    };

const updateProfile = async (req, res) => {
        const {name, gender, phone, address} = req.body;

        try {
            const user = await userModel.findByIdAndUpdate(
                req.body.userId,
                {name, gender, phone, address},
                {new:true, runValidators:true}
            ).select('-password -cartData');

            if (!user) {
                return res.json({success:false,message:'User not found'});
            }

            res.json({success:true,data:user});
        }
        catch(error){
            console.log(error);
            res.json({success:false,message:'Error while updating profile'});
        }
    };

export {loginUser,registerUser,getProfile,updateProfile}