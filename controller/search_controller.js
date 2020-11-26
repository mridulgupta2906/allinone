const model=require('../model/search_model')
const logger=require('../logger')


exports.search=async(req,res)=>{
    try{
    let name=req.body.name;
    let limit=req.body.limit;
    let result =await model.searchproduct(name,limit);
    let result1=await model.searchcategory(name,limit);
    let result2=await model.searchkeyword(name,limit);
    // console.log("result"+result.rows)
    // console.log("result1"+result1)
    // console.log("result2"+result2.rows)
    // JUST PREVIOUS SEARCHED DATA
    let final;
    let final7;
    let last=[];
    let searchelement=name[name.length-1]
    let final2;
    let r=result.rows;
    let r1=result1.rows;
    let r2=result2.rows;
    let u;
    final=r.concat(r1,r2);
    console.log("final :"+final)
        if(name.length!=1)
        {
            console.log("when two or more elements in string")
            // console.log(final)
            // final1=final.slice(0,10)
            
            // console.log(final1)
            let name1=name.substr(0,name.length-1)
            let limit1=Math.ceil(limit/2);
            let newresult =await model.searchproduct(name1,limit1);
            let newresult1=await model.searchcategory(name1,limit1);
            let newresult2=await model.searchkeyword(name1,limit1);
            let v=newresult.rows;
             let v1=newresult1.rows;
             let v2=newresult2.rows;
             final7=v.concat(v1,v2);    //array of json with key and id
             for(i=0;i<final7.length-1||i==10;i++)
            {
                final2=final7[i].name.substr(name.length-1,final7[i].name.length)
                let a=final2.search(`${searchelement}`);
                if(a!=-1)
                {
                    let Json={
                        name:'',
                        key:''
                    }
                    Json.name=final7[i].name;
                    Json.key=final7[i].key;
                   last.push(Json);
                  //console.log(last[i].name)
                }
            }console.log("last array:  "+last)
        }
        if(name.length==1)
        {
           console.log("name.length==1 entered"); 
        }
        else
        {
            let arr=[];
            for(p=0;p<final.length;p++) arr.push(final[p].name)
            console.log(arr)
            for(let b=0;b<last.length;b++)
            {
                if(arr.includes(last[b].name)) console.log("final already has this element"+last[b].name);
                else final.push(last[b])
            }
        }
   if(result) {
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