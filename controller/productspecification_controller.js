const model=require('../model/productspecification_model')
const logger=require('../logger')


exports.addspecification=async(req,res)=>{
   try{
    let keys=Object.keys(req.body);
    let values=Object.values(req.body);
    let result =await model.addspecification(keys,values);
    if(result){
        return res.status(200).json({
            status:"Success",
            statusCode:200,
            message:"Added successfull",
            data:result
        })
    }
    else{
        return res.status(200).json({
            status:"Error",
            statusCode:400,
            message:"can't add ",
            data:[]
        })
    }
   }catch(error){
       logger.error(`error (productspecificationcontroller->addspecification) : ${error.message}`);
       res.status(500).json({status:error,message:error.message,statusCode:500})
   } 
    

}
exports.updatespecification=async(req,res)=>{
    try{
        let keys=Object.keys(req.body);
        let values=Object.values(req.body)
        let result=await model.updatespecification(keys,values);
        if(result){
            return res.status(200).json({
                status:"Success",
                statusCode:200,
                message:"update successfull",
                data:result 
                })
        }
        else{
            return res.status(200).json({
                status:"Error",
                statusCode:400,
                message:"can't update",
                data:[]
            })
        }
    }catch(error){
        logger.error(`error (productspecificationcontroller->updatespecification) : ${error.message}`)
        res.status(500).json({status:error,message:error.message,statusCode:500})
    }
}

exports.deletespecification=async(req,res)=>{
    try{
        let id=req.body.id;
        let result=await model.deletespecification(id);
        if(result){
            return res.status(200).json({
                status:"Success",
                statusCode:200,
                message:"delete successfull",
                data:result 
                })
        }
        else{
            return res.status(200).json({
                status:"Error",
                statusCode:400,
                message:"can't delete",
                data:[]
            })
        }
    }catch(error){
        logger.error(`error (productspecificationcontroller->deletespecification) : ${error.message}`);
        res.status(500).json({status:error,message:error.message,statusCode:500})
    }

}