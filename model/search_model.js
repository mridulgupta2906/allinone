const pool=require('../db')
const logger=require('../logger')

exports.searchproduct=async(name,limit)=>{
    try{
        let Json={
            rows:[]
        }
        let query=`select key,name from public.product where name_tsvector @@ plainto_tsquery('${name}') or name ILIKE '%${name}%' limit ${limit};`
        let result=await pool.query(query);
        //  console.log(result.rows);
        if(result.rowCount>0 && result!=null){console.log("here1");return result}
        else{console.log("else1");return Json};
    }
    catch(error){
        console.log(`catch error (searchmodel->searchproduct) : ${error.message}`)
    }
}
exports.searchcategory=async(name,limit)=>{
    try{
        let Json={
            rows:[]
        }
        let query=`select key,name from public.category where category_tsvector @@ plainto_tsquery('${name}') or name ILIKE '%${name}%' limit ${limit};`
        let result=await pool.query(query);
        // console.log(result1.rows);s
        if(result.rowCount>0 && result!=null){console.log("here2");return result}
        else{console.log("else2");return Json}
    }
    catch(error){
        console.log(`catch error (searchmodel->searchcategory) : ${error.message}`)
    }
}

exports.searchkeyword=async(name,limit)=>{
    try{
        let Json={
            rows:[]
        }
        let query=`select key,name from public.keyword where keyword_tsvector @@ plainto_tsquery('${name}') or name ILIKE '%${name}%' limit ${limit};`
        let result=await pool.query(query);
        //  console.log(result.rows);
        if(result.rowCount>0 && result!=null){console.log("here3");return result}
        else {console.log("else3");return Json}
    }
    catch(error){
        console.log(`catch error (searchmodel->searchkeyword) : ${error.message}`)
    }
}