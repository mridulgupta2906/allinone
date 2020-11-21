const pool = require('../db');
const func=require("../function")
const logger=require('../logger')

exports.addreview = async (keys, values) => {
    try{
        let key = "";
    let key1='';
    let val1='';
    let val="";
    let id=func.generateUUID();
    for(i=0;i<keys.length;i++) {
        key=key+`${keys[i]},`;
        val=val+`'${values[i]}',`;
    }
    
    key1=key.substring(0,key.length-1);
    val1=val.substring(0,val.length-1);
    let sql=`INSERT INTO "review" (id,${key1}) values ($1,${val1});`;
    let data=[id];
    let sql1= await pool.query(sql,data);
    if(sql1.rowCount>0)return id;
    else return 0;

    }catch(error){
    logger.error(`error occured (reviewmodel->addreview) : ${error.message}`);}
}

exports.updatereview=async(keys,values)=>{
    try{
        let pos=keys.indexOf("id");
        let value=values[pos];
        let com='';
        for(i=0;i<keys.length;i++){
           if(i==pos)continue;
           else com=com+keys[i]+"='"+values[i]+"',";
       }
       com1=com.substring(0,com.length-1);
       let sql=`UPDATE "review" SET ${com1} where id=$1`;
       let data=[value];
       let sql1=await pool.query(sql,data);
       if(sql1.rowCount>0)return value;
       else return 0;
   
    }catch(error){
        logger.error('error occured (reviewmodel->updatereview) : '+error.message);
    }
}


exports.deletereview=async(id)=>{
    try{
        let sql='DELETE FROM "review" WHERE id=$1;' 
        let data=[id];
        let sql1=await pool.query(sql,data);
        if(sql1.rowCount>0)return id;
        else return 0;
    }
    catch(error){
        logger.error(`error (reviewmodel->deletereview) : ${error.message}`)
    }

}