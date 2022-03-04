const mongoose=require('mongoose');
const taskSchema=new  mongoose.Schema({
    email:{
      type:String,required:true,
      
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    priority:{
        type:String,
        required:true
    },
    date:{
        type:Date,
       default:Date.now()
    },
    due_date:{
        type:Date,
        required:true
    },
    stage:{
        type:Number
    },

})
module.exports=mongoose.model('task',taskSchema)