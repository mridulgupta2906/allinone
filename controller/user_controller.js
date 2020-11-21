const user=require("../model/user_model");
// const func =require('../function')
const logger=require('../logger');


exports.logincheck=async(req,res)=>{
    try{
    let password=req.body.password;
    let name=req.body.name;
    let phone=req.body.phone;
    let result=await user.logincheck(password,name,phone);
    if(result.rowCount>0)
    { 
        return res.status(200).json({
            status:"success",
            statusCode:200,
            message:"login successfully",
            data:  result.rows[0].id
        })
    }
    else
    {
        return res.status(200).json({
           status:"error",
           statusCode:400,
           message:"no data found",
           data:[]
       }) 
    }   
  }catch(error){
    logger.error(`can't login (usercontroller->logincheck) :${$error.message}`);
    return res.status(500).json({status:'error',message:error.message, statusCode:500})
    }
    
    
    
}

exports.forgetpassword=async(req,res)=>{
  try{
    let email=req.body.email;
   
    let result=await user.forgetpassword(email);
    if(result==2)
    { 
        return res.status(200).json({
            status:"warning",
            statusCode:304,
            message:"Invalid email . Please enter registered email",
            data:[]
        })
    }
    if(result==5)
    { 
        return res.status(200).json({
            status:"success",
            statusCode:200,
            message:`reset password link send to registered email: ${email} successfully`,
            data:[]
        })
    }
    else
    {
        return res.status(200).json({
           status:"error",
           statusCode:400,
           message:"no data found",
           data:[]
       }) 
    }   
  }catch(error){
    logger.error(`can't reset password (usercontroller->forgetpassword) :${error.message}`);
    return res.status(500).json({status:'error',message:error.message, statusCode:500})
    }
    
}


exports.signup=async(req,res)=>{
    
   try{ 
    let keys=Object.keys(req.body);
    let values=Object.values(req.body);
 
    let result=await user.signup(keys,values);
    if(result)
    { 
        return res.status(200).json({
            status:"success",
            statusCode:200,
            message:"signup successfully",
            data: result
        })
    }
    else
    {
        return res.status(200).json({
           status:"error",
           statusCode:400,
           message:"no data found",
           data:[]
       }) 
    }   
  }catch(error){
    logger.error(`can't signup (usercontroller->signup) :${$error.message}`);
    return res.status(500).json({status:'error',message:error.message, statusCode:500})
    }

}

exports.update_user_profile=async(req,res)=>{
    try{
    let keys=Object.keys(req.body);
    let values=Object.values(req.body);
    
    let result=await user.update_user_profile(keys,values);
    if(result)
    { 
        return res.status(200).json({
            status:"success",
            statusCode:200,
            message:"data updated successfully",
            data:  result
        })
    }
    else
    {
        return res.status(200).json({
           status:"error",
           statusCode:400,
           message:"no data found",
           data:[]
       }) 
    }   
  }catch(error){
    logger.error(`can't update data (usercontroller->updateuserprofile) :${$error.message}`);
    return res.status(500).json({status:'error',message:error.message, statusCode:500})
    }

}


exports.deleteuser=async(req,res)=>{
    try{
        let id=req.body.id;
        let result=await user.deleteuser(id);
        if(result)
        {
            return res.status(200).json({
                status:'Success',
                statusCode:200,
                message:"Profile Deleted successfull",
                data:result
            })
        
        }
        else
        {
            return res.status(200).json({
                status:"Error",
                statusCode:400,
                message:"no data found",
                data:[]
            })
        }
    }catch(error){
        logger.error(`can't delete data (usercontroller->deleteuser) : ${error}`);
        res.status(500).json({status:"error",message:error.message,statusCode:500});
    }
}













