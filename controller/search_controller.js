const model=require('../model/search_model')
const logger=require('../logger')

exports.search=async(req,res)=>{
    try{
        let elements=[];
    let name=req.body.name;
    let limit=req.body.limit;
    let result =await model.searchproduct(name,limit);
    let result1=await model.searchcategory(name,limit);
    let final=[];
    let r=result.rows;
    let r1=result1.rows;
    if(result.rowCount>0 && result1.rowCount>0)
    {
        final=r.concat(r1)
    }
    else if(result.rowCount>0) final=result.rows;
    else if(result1.rowCount>0) final=result1.rows;
    else final=[];  
   if(1) {
        res.status(200).json({
            status:'success',
            statusCode:200,
            message:"searched elements:",
            data:final
        })
    }
    else
        {
            res.status(200).json({
                status:'Error',
                statusCode:400,
                message:"did'nt search",
                data:[]
            })
        }
    }catch(error)
    {
        logger.error(`errror (searchcontroller->search) : ${error.message}`)
        res.status(500).json({statusCode:500,status:error,message:error.message})
    }
}