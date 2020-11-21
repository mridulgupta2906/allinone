const model=require('../model/cartitems_model')
const logger=require('../logger')

exports.createcartitems=async(req,res)=>{
    try{
        let keys=Object.keys(req.body);
        let values=Object.values(req.body);
        let result=await model.createcartitems(keys,values);
        if(result){
            return res.status(200).json({
                status:"success",
                statusCode:200,
                messsage:"Created Cartitems",
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
        logger.error(`can't add (cartitemscontroller->createcartitems) :${$error.message}`);
        return res.status(500).json({status:'error',message:error.message, statusCode:500})
     }
}

exports.updatecartitems=async(req,res)=>{
    try{
        let keys=Object.keys(req.body)
        let values=Object.values(req.body)
        let result=await model.updatecartitems(keys,values);
        if(result){
            return res.status(200).json({
                status:"success",
                statusCode:200,
                messsage:"updated in table",
                data:result
            })
        }
        else{
            return res.status(200).json({
                status:"error",
                statusCode:400,
                messsage:"no data updated",
                data:[]
                
            })
        }
    }catch(error){
        logger.error(`can't update (cartitemscontroller->updatecartitems) :${error.message}`);
        return res.status(500).json({status:'error',message:error.message,statusCode:500});
    }
}

exports.deletecartitems=async(req,res)=>{
    try{
        let id=req.body.id;
        let result=await model.deletecartitems(id)
        if(result){
            return res.status(200).json({
                status:"success",
                statusCode:200,
                messsage:"deleted cartitems",
                data:result
            })
        }
        else{
            return res.status(200).json({
                status:"Error",
                statusCode:400,
                messsage:"can't delete",
                data:[]
            })
        }
    }catch(error){
        logger.error(`error (cartitemscontroller->deletecartitems) : ${error}`)
        res.status(500).json({status:error,message:error.message,statusCode:500})
    }
}