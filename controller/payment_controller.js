const model=require("../model/payment_model");
const logger=require('../logger');


exports.addpayment=async(req,res)=>{
     try{
        let keys=Object.keys(req.body);
        let values=Object.values(req.body);
        let result=await model.addpayment(keys,values);
        if(result){
            return res.status(200).json({
                status:"success",
                statusCode:200,
                messsage:"payment added in table",
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
        logger.error(`can't add payment (paymentcontroller->addpayment) :${$error.message}`);
        return res.status(500).json({status:'error',message:error.message, statusCode:500})
     }
   

}


exports.updatepayment=async(req,res)=>{
        try{
            let keys=Object.keys(req.body)
            let values=Object.values(req.body)
            let result=await model.updatepayment(keys,values);
            if(result){
                return res.status(200).json({
                    status:"success",
                    statusCode:200,
                    messsage:"payment updated in table",
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
            logger.error(`can't update payment (paymentcontroller->updatepayment) :${error.message}`);
            return res.status(500).json({status:'error',message:error.message,statusCode:500});
        }

}

exports.deletepayment=async(req,res)=>{
    try{
        let id=req.body.id;
        let result=await model.deletepayment(id);
        if(result){
            return res.status(200).json({
                status:"Success",
                statusCode:200,
                message:"Payment Deleted",
                data:result
            })
        }
        else{
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"Payment not deleted",
                data:[]
            })
        }
    }catch(error){
        logger.error(`can't delete payment (paymentcontroller->deletepayment) :${error.message}`);
        return res.status(500).json({status:'error',message:error.message,statusCode:500});
    }
    
}