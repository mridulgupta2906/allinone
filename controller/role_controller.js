const model=require("../model/role_model");
const logger=require('../logger');


exports.addrole=async(req,res)=>{
     try{
        let keys=Object.keys(req.body);
        let values=Object.values(req.body);
        let result=await model.addrole(keys,values);
        if(result){
            return res.status(200).json({
                status:"success",
                statusCode:200,
                messsage:"role added in table",
                data:result
            })
        }
        else{
            return res.status(200).json({
                status:"error",
                statusCode:400,
                messsage:"no data entered",
                data:[]
                
            })
        }
     }catch(error){
        logger.error(`can't add role (rolecontroller->addrole) :${$error.message}`);
        return res.status(500).json({status:'error',message:error.message, statusCode:500})
     }
   

}


exports.updaterole=async(req,res)=>{
        try{
            let keys=Object.keys(req.body)
            let values=Object.values(req.body)
            let result=await model.updaterole(keys,values);
            if(result){
                return res.status(200).json({
                    status:"success",
                    statusCode:200,
                    messsage:"role updated in table",
                    data:result
                })
            }
            else{
                return res.status(200).json({
                    status:"error",
                    statusCode:400,
                    messsage:"no data entered",
                    data:[]
                    
                })
            }
        }catch(error){
            logger.error(`can't update role (rolecontroller->updaterole) :${error.message}`);
            return res.status(500).json({status:'error',message:error.message,statusCode:500});
        }

}

exports.deleterole=async(req,res)=>{
    try{
        let id=req.body.id;
        let result=await model.deleterole(id);
        if(result){
            return res.status(200).json({
                status:"Success",
                statusCode:200,
                message:"role Deleted",
                data:result
            })
        }
        else{
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"role not deleted",
                data:[]
            })
        }
    }catch(error){
        logger.error(`can't delete role (rolecontroller->deleterole) :${error.message}`);
        return res.status(500).json({status:'error',message:error.message,statusCode:500});
    }
    
}