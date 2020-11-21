const model=require('../model/productandspecification_model')
const logger=require('../logger')

exports.addproduct=async(req,res)=>{
   try{
    let keys=Object.keys(req.body)
    let values=Object.values(req.body)
    let result=await model.addproduct(keys,values);
    if(result.statusCode===200){
        return res.status(200).json(result)
    }
    else if(result.statusCode===422){
        return res.status(422).json(result)
    }
    else{
        return res.status(400).json(result)
    }
}catch(error){
       logger.error(`can't add product (productandspecification->addproduct): ${error.message}`)
        res.status(500).json({status:error,message:error.message,statusCode:500})
    }
}


exports.deleteproduct=async(req,res)=>{
    let id=req.body.id;
    let result=await model.deleteproduct(id);
    if(result.statusCode===200)
    {
        return res.status(200).json(result)
    }
    else if(result.statusCode===422)
    {
        return res.status(422).json(result)
    }
    else
    {
        return res.status(400).json(result)
    }
}
