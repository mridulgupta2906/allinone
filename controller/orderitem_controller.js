const model=require('../model/orderitem_model')
const logger=require('../logger')
const e = require('express')

exports.addorderitems=async(req,res)=>{
    try{
        let keys=Object.keys(req.body)
        let values=Object.values(req.body)
        let result=await model.addorderitems(keys,values)
        if(result){
            return res.status(200).json({
                status:"success",
                statusCode:200,
                message:"added order item",
                data:result
            })
        }
        else{
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"no data entered",
                data:[]
            })
        }
    }catch(error){
        logger.error(`can't add orderitem (orderitemcontroller->addorderitems) : ${error.message}`)
        res.status(500).json({status:error,message:error.message,statusCode:500})
    }
}


exports.updateorderitems=async(req,res)=>{
    try{
        let keys=Object.keys(req.body)
        let values=Object.values(req.body)
        let result=await model.updateorderitems(keys,values)
        if(result){
            return res.status(200).json({
                status:"success",
                statusCode:200,
                message:"Updated successfull",
                data:result
            })
        }
        else{
            return res.status(200).json({
               status:"Error", 
               statusCode:400,
               message:"no data updated",
               data:[]
            })
        }
    }catch(error){
        logger.error(`can't update (orderitemcontroller->updateorderitems) : ${error.message}`)
    }
}


exports.deleteorderitems=async(req,res)=>{
    try{
        let id=req.body.id;
        let result=await model.deleteorderitems(id);
        if(result){
            return res.status(200).json({
                status:"success",
                statusCode:200,
                message:"deleted successfull",
                data:result
            }) 
        }
        else{
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"not deleted",
                data:[]
            })
        }
    }catch(error){
        logger.error(`can't delete (orderitemcontroller->deleteorderitems) : ${error.message}`)
        res.status(500).json({status:error,message:error.message,statusCode:500})
    }
}