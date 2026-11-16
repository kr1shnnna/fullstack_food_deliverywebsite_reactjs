import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String, required:true},
    gender:{type:String,enum:['','Male','Female','Other','Prefer not to say'],default:''},
    phone:{type:String,default:''},
    address:{
        street:{type:String,default:''},
        city:{type:String,default:''},
        state:{type:String,default:''},
        zipcode:{type:String,default:''},
        country:{type:String,default:''}
    },
    cartData:{type:Object,default:{}}

},{minimize:false})

const userModel=mongoose.models.user || mongoose.model('user',userSchema);

export default userModel;