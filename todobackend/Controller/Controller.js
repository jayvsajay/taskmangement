const userModel=require('../db/userSchema');
const taskModel=require('../db/taskSchema')
const postdata=async(data)=>{
    let firstname=data.firstname;
    let lastname=data.lastname;
    let email=data.email;
    let password=data.password;
    let ins=new userModel({firstname:firstname,lastname:lastname,email:email,password:password})
    await ins.save((err)=>{
        if(err){ return err;
    }
    else{
        return("added suuccessfully")
    }
})
}
const userData = (email)=>{
    return userModel.findOne({email:email}).exec();
}
const getOrderById = (id) =>{
    return taskModel.findOne({_id:id}).exec();
}
module.exports={postdata,userData,getOrderById};