const express = require('express');
const router = express.Router();
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const jwtsecret = 'shfdjd43kskdj5jfdk';
const multer = require('multer');
const path = require('path');
const bcrypt=require('bcrypt')
const helpers=require('../helpers/helpers.js');
const db=require('../config/db');
const responsevalidate=require('./validator')
const userModel=require('../db/userSchema')
const taskModel=require('../db/taskSchema')
const {userData}=require('../Controller/Controller');
const { validateUser } = require('./validator.js');
const { aggregate } = require('../db/userSchema');

db();
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
    }
})
function authenticateToken(req,res,next){
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    if(token===null){
        
        res.json({"err":1,"msg":"Token not match"})
    }
    else {
        jwt.verify(token,jwtsecret,(err,data)=>{
            if(err){
                res.json({"err":1,"msg":"Token incorrect"})
            }
            else {
                next();
            }
        })
    }
}
router.post('/register', (req, res)=>{        
    let upload=multer({storage:storage,fileFilter:helpers.imageFilter}).single('myfile');
    upload(req,res,(err)=>{
        let {firstname,
            lastname,
            email,
            password} = req.body;
            const hash = bcrypt.hashSync(password, saltRounds);

        if(req.fileValidationError){
            res.json({err:req.fileValidationError,status_code:400});
        }
        else if(!req.file){
        let ins_user = new userModel({firstname:firstname,lastname:lastname,email:email,password:hash});
        ins_user.save((err)=>{
            if(err){
                res.json({err:"Registeration already done with this email",status_code:400})
            }
            else{
                res.json({msg:"Registered successfully",status_code:200});
            }
        });
        }
        else if(err){
            res.json({err:"Some file uploading error",status_code:400});
        }
        else{
            let logo=req.file.filename;  
            let ins_user = new userModel({firstname:firstname,lastname:lastname,email:email,password:hash,
                logo:logo});
                ins_user.save((err)=>{
                    if(err){
                        res.json({err:"Registeration already done with this email",status_code:400})
                    }
                    else{
                        res.json({msg:"Registered successfully",status_code:200});
                    }
                });
        }
    })
})
    
    router.post('/login',responsevalidate,
    
    (req,res)=>{
       
        let{email, password} = req.body;
        const logindata = userData(email);

        logindata.then(response=>{
            console.log(response)
            if(response){
                if(bcrypt.compareSync(password, response.password)){
                    let payload={
                        uid:email
                    }
                    const token = jwt.sign(payload, jwtsecret,{expiresIn:3600000})
                    res.json({msg: "Logged in successfully","token":token,user:response,status_code:200})
                }
                else{
                    res.json({err:"Password Error",status_code:400})
                }
            }
            else{
                res.json({err:"Email doesn't exists",status_code:400});
            }
        })
    
    })
    router.get('/gettask/:email',(req,res)=>{
        let email=req.params.email;
        console.log(email)
        taskModel.find({email:email}).sort({due_date:1}).limit(5).exec((err,info)=>{
            if(err){
                res.json({err:"some error"})
            }
            else{
                
                res.json({todo:info})
            }
        })
    })
   router.get('/gettask1/:email',async(req,res)=>{
//     let email=req.params.email;
//     console.log(email)
//   const result=await taskModel.aggregate([{$match:{email:email}},{$group:{_id:"$email",count:{$sum:1}}}])
//   console.log(result[0].count)
//   res.json({todo1:result[0].count})
 
let email=req.params.email;
console.log(email)
taskModel.find({email:email}).exec((err,info)=>{
    if(err){
        res.json({err:"some error"})
    }
    else{
        
        res.json({todo1:info})
    }
})
   })
  router.post('/addtask', authenticateToken,(req,res)=>{
      let email=req.body.email;
      let title=req.body.title;
      let description=req.body.description;
      let priority=req.body.priority;
      let due_date=req.body.due_date;
      let stage=req.body.stage;
      let data={titl:title,description:description,priority:priority,due_date:due_date
    ,stage:stage}
     let ins_task=new taskModel({email:email,title:title,description:description,priority:priority,due_date:due_date,
    stage:stage})
     ins_task.save((err)=>{
        if(err){
            res.json({err:"Some Error",status_code:400})
        }
        else{
            res.json({msg:"Task Added successfully",todo:data,status_code:200});
        }
    });
  })
  router.put('/edittask/:id', authenticateToken,(req,res)=>{
      let id=req.params.id;
    let title=req.body.title;
    let description=req.body.description;
    let priority=req.body.priority;
    let date=req.body.date;
    let due_date=req.body.due_date;
    taskModel.updateOne({_id:id},{$set:{title:title,description:description,priority:priority,date:date,due_date:due_date}},(err)=>{
        if(err){
            res.json({err:"Not able to Update"})
        }
        else{
            res.json({msg:"updated successfully"})
        }
    })
  })
  router.delete('/deletetask/:id', authenticateToken,(req,res)=>{
      let id=req.params.id;
      taskModel.deleteOne({_id:id},(err)=>{
          if(err){
              res.json({err:"not able delete"})
          }
          else{
              res.json({msg:"Deleted  successfull"})
          }
      })
  })
  router.put('/incrementstage/:id',(req, res)=>{
 let id=req.params.id;
 console.log(id)
    taskModel.updateOne({_id:id},{$inc:{stage:+1}},(err)=>{
        if(err){
            res.json({err:"error occured"})
        }
        else{
            res.json({msg:"Stage move to next stage successfully"});
        }
    })
})
router.put('/decrementstage/:id',(req, res)=>{
   let id=req.params.id;
   taskModel.findOne({_id:id},(err,info)=>{
       if(err){
           res.json({err:"error"})
       }
       else{
           if(info.stage===0){
            res.json({err:'Stage cannot be decremented'});
           } else{
            taskModel.updateOne({_id:id},{$inc:{stage:-1}},(err)=>{
                if(err){
                    res.json({err:err})
                }
                else{
                    res.json({msg:"Stage moved back successfully",status_code:200});
                }
            })
       }
   
    }
    })
})
router.get('/getstage/:email',(req,res)=>{
    let email=req.params.email;
    taskModel.find({email:email,stage:0},(err,info)=>{
        if(err){
            res.json({err:"some error"})
        }
        else{
            res.json({todo:info})
        }
    })
})
router.put('/updatestage',(req,res)=>{
  let {id,stage}=req.body;
  taskModel.updateOne({_id:id},{$set:{stage:stage}},(err)=>{
    if(err){
        res.json({err:"some error"})
    }
    else{
        res.json({msg:"Dragged"})
    }
  })

})
router.get('/getstage1/:email',(req,res)=>{
    let email=req.params.email;
    taskModel.find({email:email,stage:1},(err,info)=>{
        if(err){
            res.json({err:"some error"})
        }
        else{
            res.json({todo:info})
        }
    })
})
router.get('/getstage2/:email',(req,res)=>{
    let email=req.params.email;
    taskModel.find({email:email,stage:2},(err,info)=>{
        if(err){
            res.json({err:"some error"})
        }
        else{
            res.json({todo:info})
        }
    })
})
router.get('/getstage3/:email',(req,res)=>{
    let email=req.params.email;
    taskModel.find({email:email,stage:3},(err,info)=>{
        if(err){
            res.json({err:"some error"})
        }
        else{
            res.json({todo:info})
        }
    })
})

module.exports=router;