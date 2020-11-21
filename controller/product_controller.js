const product=require("../model/product_model");
const logger=require('../logger');


exports.populate=async()=>{
    let result=await product.populate();
    
}




exports.addproduct=async(req,res)=>{
     try{
        let keys=Object.keys(req.body);
        let values=Object.values(req.body);
        let result=await product.addproduct(keys,values);
        if(result){
            return res.status(200).json({
                status:"success",
                statusCode:200,
                messsage:"product added in table",
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
        logger.error(`can't add product (productcontroller->addproduct) :${error.message}`);
        return res.status(500).json({status:'error',message:error.message, statusCode:500})
     }
   

}


exports.updateproduct=async(req,res)=>{
        try{
            let keys=Object.keys(req.body)
            let values=Object.values(req.body)
            let result=await product.updateproduct(keys,values);
            if(result){
                return res.status(200).json({
                    status:"success",
                    statusCode:200,
                    messsage:"product updated in table",
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
            logger.error(`can't update product (productcontroller->updateproduct) :${error.message}`);
            return res.status(500).json({status:'error',message:error.message,statusCode:500});
        }

}

exports.deleteproduct=async(req,res)=>{
    try{
        let id=req.body.id;
        let result=await product.deleteproduct(id);
        if(result){
            return res.status(200).json({
                status:"Success",
                statusCode:200,
                message:"Product Deleted",
                data:result
            })
        }
        else{
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"Product not deleted",
                data:[]
            })
        }
    }catch(error){
        logger.error(`can't delete product  (productcontroller->deleteproduct) :${error.message}`);
        return res.status(500).json({status:'error',message:error.message,statusCode:500});
    }
    
}