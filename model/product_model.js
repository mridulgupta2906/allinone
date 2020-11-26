const pool = require('../db');
const func=require("../function")
const logger=require('../logger')


exports.populate=async()=>{
    
    for(let i=0;i<8000;i++)
    {
        
        
        let names='onports'+i;
       
        // console.log(name,names);
        let query=`delete from "product" where name=$1;`
        let data=[names];
        let result=await pool.query(query,data);
        console.log(i);
        if(result.rowCount>0) console.log("success"+i)
    }
    
    
}


exports.addproduct = async (keys, values) => {
    try{
        let ke = "";
    let key1='';
    let val1='';
    let val="";
    let key=func.generateUUID();
    for(i=0;i<keys.length;i++) {
        ke=ke+`${keys[i]},`;
        val=val+`'${values[i]}',`;
    }
    
    key1=ke.substring(0,ke.length-1);
    val1=val.substring(0,val.length-1);
    let sql=`INSERT INTO "product" (key,${key1}) values ($1,${val1});`;
    let data=[key];
    let sql1= await pool.query(sql,data);
    if(sql1.rowCount>0)return key;
    else return 0;

    }catch(error){
    logger.error(`error occured (productmodel->addproduct) : ${error.message}`);}
}

exports.updateproduct=async(keys,values)=>{
    try{
        let pos=keys.indexOf("key");
        let value=values[pos];
        let com='';
        for(i=0;i<keys.length;i++){
           if(i==pos)continue;
           else com=com+keys[i]+"='"+values[i]+"',";
       }
       com1=com.substring(0,com.length-1);
       let sql=`UPDATE "product" SET ${com1} where key=$1`;
       let data=[value];
       let sql1=await pool.query(sql,data);
       if(sql1.rowCount>0)return value;
       else return 0;
   
    }catch(error){
        logger.error('error occured (productmodel->updateproduct) : '+error.message);
    }
}


exports.deleteproduct=async(key)=>{
    try{
        let sql='DELETE FROM "product" WHERE key=$1;' 
    let data=[key];
    let sql1=await pool.query(sql,data);
    console.log(sql1);
    if(sql1.rowCount>0)return key;
    else return 0;
    }
    catch(error){
        logger.error(`error (productmodel->deleteproduct) : ${error.message}`)
    }

}