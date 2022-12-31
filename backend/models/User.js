const mongoose =require('mongoose');
const { Schema }=mongoose;

const UserSchema = new Schema ({
    
        name:{
            type: String,
            required :true
        },
        email:{
            type: String,
            required:true,
            unique:true
        },
        password:{
            type:String ,
            required:true
        },
        date:{
            type:Date,
            default: Date.now
        }

    



});

const User=mongoose.model('user',UserSchema);  // mongoose Model has two argument 1- Name of Model 2.Name of Schema
module.exports=User