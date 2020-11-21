const model=require("../model/review_model");
const logger=require('../logger');


exports.addreview=async(req,res)=>{
     try{
        let keys=Object.keys(req.body);
        let values=Object.values(req.body);
        let result=await model.addreview(keys,values);
        if(result){
            return res.status(200).json({
                status:"success",
                statusCode:200,
                messsage:"review added in table",
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
        logger.error(`can't add review (reviewcontroller->addreview) :${$error.message}`);
        return res.status(500).json({status:'error',message:error.message, statusCode:500})
     }
   

}


exports.updatereview=async(req,res)=>{
        try{
            let keys=Object.keys(req.body)
            let values=Object.values(req.body)
            let result=await model.updatereview(keys,values);
            if(result){
                return res.status(200).json({
                    status:"success",
                    statusCode:200,
                    messsage:"review updated in table",
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
            logger.error(`can't update review (reviewcontroller->updatereview) :${error.message}`);
            return res.status(500).json({status:'error',message:error.message,statusCode:500});
        }

}

exports.deletereview=async(req,res)=>{
    try{
        let id=req.body.id;
        let result=await model.deletereview(id);
        if(result){
            return res.status(200).json({
                status:"Success",
                statusCode:200,
                message:"review Deleted",
                data:result
            })
        }
        else{
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"review not deleted",
                data:[]
            })
        }
    }catch(error){
        logger.error(`can't delete review (reviewcontroller->deletereview) :${error.message}`);
        return res.status(500).json({status:'error',message:error.message,statusCode:500});
    }
    
}