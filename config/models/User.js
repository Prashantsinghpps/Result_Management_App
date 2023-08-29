const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        type :String,
    required:true
    },
    rollnumber :{
        type:Number,
        required:true
    },
    score :{
        type:Number,  //here string does not work so we need to write String
        required:true
    },
    dateOfBirth :{
        type:Date,
       required:true
    }
});

const User=mongoose.model('User',userSchema);

module.exports=User;
