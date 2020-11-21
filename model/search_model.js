const pool=require('../db')
const logger=require('../logger')

exports.searchproduct=async(name,limit)=>{
    try{
        let query=`select id,name from public.product where name_tsvector @@ plainto_tsquery('${name}') or name ILIKE '%${name}%' limit ${limit};`
        let result=await pool.query(query);
        //  console.log(result.rows);
        if(result.rowCount>0) return result;
        else return 0;
    }
    catch(error){
        console.log(`catch error (searchmodel->search) : ${error.message}`)
    }
}
exports.searchcategory=async(name,limit)=>{
    try{
        let query=`select key,name from public.category where category_tsvector @@ plainto_tsquery('${name}') or name ILIKE '%${name}%' limit ${limit};`
        let result1=await pool.query(query);
        // console.log(result1.rows);
        if(result1.rowCount>0) return result1;
        else return 0;
    }
    catch(error){
        console.log(`catch error (searchmodel->search) : ${error.message}`)
    }
}