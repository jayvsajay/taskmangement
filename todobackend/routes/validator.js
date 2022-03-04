const Joi=require('joi');
function responsevalidate(req,res,next){
  const schema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
  
    password: Joi.string()
      .min(8)
      .required(),
  })
  const {error}=schema.validate(req.body);
  if(error){
    return res.json({err:error.message})
  }
  else{
    next()
  }
}
module.exports=responsevalidate;