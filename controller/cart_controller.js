const model=require('../model/cart_model')
const logger=require('../logger')

exports.createcart=async(req,res)=>{
    try{
        let keys=Object.keys(req.body)
        let values=Object.values(req.body)
        let result=await model.createcart(keys,values);
        if(result){
            return res.status(200).json({
                status:"success",
                statusCode:200,
                messsage:"cart added",
                data:result
            })
        }
        else{
            return res.status(200).json({
                status:"success",
                statusCode:400,
                messsage:"can't add cart",
                data:[]
            })
        }
    }catch(error){
        logger.error(`error (cartcontroller->createcart) : ${error}`)
        res.status(500).json({status:error,messsage:error.messsage,statusCode:500})
    }
}

exports.updatecart=async(req,res)=>{
    try{
        let keys=Object.keys(req.body)
        let values=Object.values(req.body)
        let result=await model.updatecart(keys,values)
        if(result){
            return res.status(200).json({
                status:"success",
                statusCode:200,
                messsage:"cart updated",
                data:result
            }) 
        }
        else{
            return res.status(200).json({
                status:"Error",
                statusCode:400,
                messsage:"can't update",
                data:[]
            })
        }
    }catch(error){
        logger.error(`error (cartcontroller->updatecart) : ${error}`)
        res.status(500).json({status:error,messsage:error.messsage,statusCode:500})
    }
}

exports.deletecart=async(req,res)=>{
        try{
            let id=req.body.id;
            let result =await model.deletecart(id);
            if(result){
                return res.status(200).json({
                    status:"success",
                    statusCode:200,
                    messsage:"cart deleted",
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
            logger.error(`error (cartcontroller->deletecart) : ${error}`)
            res.status(500).json({status:error,messsage:error.messsage,statusCode:500})
        }
}