const model=require("../model/order_model");
const logger=require('../logger');


exports.addorder=async(req,res)=>{
     try{
        let keys=Object.keys(req.body);
        let values=Object.values(req.body);
        let result=await model.addorder(keys,values);
        if(result){
            return res.status(200).json({
                status:"success",
                statusCode:200,
                messsage:"Order added",
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
        logger.error(`can't add order (ordercontroller->addorder)  :${error.message}`);
        return res.status(500).json({status:'error',message:error.message, statusCode:500})
     }
   

}


exports.updateorder=async(req,res)=>{
        try{
            let keys=Object.keys(req.body)
            let values=Object.values(req.body)
            let result=await model.updateorder(keys,values);
            if(result){
                return res.status(200).json({
                    status:"success",
                    statusCode:200,
                    messsage:"updated",
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
            logger.error(`can't update (ordercontroller->updateorder) :${error.message}`);
            return res.status(500).json({status:'error',message:error.message,statusCode:500});
        }

}

exports.deleteorder=async(req,res)=>{
    try{
        let id=req.body.id;
        let result=await model.deleteorder(id);
        if(result){
            return res.status(200).json({
                status:"Success",
                statusCode:200,
                message:"Order Deleted",
                data:result
            })
        }
        else{
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"Order not deleted",
                data:[]
            })
        }
    }catch(error){
        logger.error(`can't delete order (ordercontroller->deleteorder) :${error.message}`);
        return res.status(500).json({status:'error',message:error.message,statusCode:500});
    }
    
}