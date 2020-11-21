const pool=require('../db')
const func=require('../function')
const logger=require('../logger')

exports.addorderitems=async(keys,values)=>{
    try{
        let id=func.generateUUID();
        let sql='';
        let sql2='';
        for(i=0;i<keys.length;i++){
            sql=sql+keys[i]+",";
            sql2=sql2+"'"+values[i]+"',";
        }
        let key=sql.substring(0,sql.length-1)
        let value=sql2.substring(0,sql2.length-1)
        let sql3=`INSERT INTO "order_item" (id,${key}) VALUES ($1,${value});`
        let data=[id];
        let result=await pool.query(sql3,data)
        if(result.rowCount>0)return id;
        else return 0;

    }catch(error){
        logger.error(`error (orderitemmodel->addorderitems) : ${error.message}`)
    }
}

exports.updateorderitems=async(keys,values)=>{
    try{
        let index=keys.indexOf("id")
        let id=values[index]
        let sql='';
        for(i=0;i<keys.length;i++){
            sql=sql+keys[i]+"='"+values[i]+"',";
        }
        let com=sql.substring(0,sql.length-1)
        let sql2=`UPDATE "order_item" set ${com} where id=$1`
        let data=[id]
        let result=await pool.query(sql2,data)
        if(result.rowCount>0) return id;
        else return 0;
    }catch(error){
        logger.error(`error (orderitemmodel->updateorderitems) : ${error.message}`)
    }
}

exports.deleteorderitems=async(id)=>{
    try{
        let sql=`DELETE FROM  "order_item" where id=$1`
    let data=[id]
    let result=await pool.query(sql,data)
    if(result.rowCount>0) return id;
    else return 0;
    }catch(error){
        logger.error(`error (orderitemmodel->deleteorderitems) : ${error.message}`)
    }
}