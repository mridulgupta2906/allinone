const model=require('../model/address_model')
const logger=require('../logger')

// exports.selectaddress=async(req,res)=>{

// }


exports.createaddress=async(req,res)=>{
    try{
        let keys=Object.keys(req.body);
        let values=Object.values(req.body);
        let result =await model.createaddress(keys,values);
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
           logger.error(`error (addresscontroller->createaddress): ${error.message}`);
           res.status(500).json({status:error,message:error.message,statusCode:500})
       } 
        
}


exports.updateaddress=async(req,res)=>{
    try{
        let keys=Object.keys(req.body)
        let values=Object.values(req.body)
        let result=await model.updateaddress(keys,values)
        if(result){
            return res.status(200).json({
                status:"Success",
                statusCode:200,
                message:"Update successfull",
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
    }
    catch(error){
        logger.error(`error (addresscontroller->updateaddress) : ${error}`)
        res.status(500).json({status:error,message:error.message,statusCode:500})
    }
}

exports.deleteaddress=async(req,res)=>{
    try{
        let id=req.body.id;
        let result=await model.deleteaddress(id);
        if(result){
            return res.status(200).json({
                status:"Success",
                statusCode:200,
                message:"Delete successfull",
                data:result
            })
        }
        else{
            return res.status(200).json({
                status:"Success",
                statusCode:200,
                message:"can't delete",
                data:[]
            })
        }
    }catch(error){
        logger.error(`error (addresscontroller->deleteaddress) : ${error}`)
        res.status(500).json({status:error,message:error.message,statusCode:500})
    }
}