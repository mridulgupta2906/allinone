const pool=require('../db')
const func=require('../function');
const { data } = require('../logger');
const logger=require('../logger')

exports.addspecification=async(keys,values)=>{
    try{
        let key='';
        let value='';
        let id=func.generateUUID();
        for(let i=0;i<keys.length;i++){
            key=key+keys[i]+',';
            value=value+"'"+values[i]+"'"+',';
        }
        let sql=key.substring(0,key.length-1);
        let sql2=value.substring(0,value.length-1);
        let sql3='INSERT INTO "product_specification"(id,'+sql+')VALUES($1,'+sql2+');';
         let data=[id];
         let result=await pool.query(sql3,data);
        if(result.rowCount>0)return id;
        else return 0;
    }catch(error){
        logger.error(`error (productspecificationmodel->addspecification) : ${error.message}`);
    }

}

exports.updatespecification=async(keys,values)=>{
    //update product set key=value    
    try{
        let sql='';    
        let index=keys.indexOf("id");
        let id=values[index];
        for(i=0;i<keys.length;i++){
            if(i==index)continue;
            else{
                sql=sql+keys[i]+"='"+values[i]+"',";
            }
        }
        let com=sql.substring(0,sql.length-1);
        let sql2=`UPDATE "product_specification" set ${com} where id=$1;`;
        let data=[id];
        let result=await pool.query(sql2,data);
        if(result.rowCount>0)return id;
        else return 0;
    }catch(error){
        logger.error(`error (productspecificationmodel->updatespecification) : ${error.message}`);
    }
}

exports.deletespecification=async(id)=>{
    //delete from product_specification where id=$1
    try{
        let sql=`DELETE FROM "product_specification" where id=$1;` 
        let data=[id];
        let result=await pool.query(sql,data);
        if(result.rowCount>0)return id;
        else return 0;
    }catch(error){
        logger.error(`error (productspecificationmodel->deletespecification) : ${error.message}`)
    }
}