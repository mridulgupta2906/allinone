const pool=require('../db')
const func=require('../function')

exports.createcart=async(keys,values)=>{
    try{
        let id=func.generateUUID();
        let key='';
        let value='';
        for(i=0;i<keys.length;i++){
            key=key+keys[i]+",";
            value=value+"'"+values[i]+"',";
        }
        let sql=key.substring(0,key.length-1)
        let sql2=value.substring(0,value.length-1)
        let sql3=`INSERT INTO "cart" (id,${sql}) VALUES ($1,${sql2});`
        let data=[id];
        let result=await pool.query(sql3,data);
        if(result.rowCount>0)return id;
        else return 0;
    }
    catch(error){
        console.log(`error (cartmodel->createcart) : ${error}`);
    }

}

exports.updatecart=async(keys,values)=>{
    try{
        let index=keys.indexOf('id')
        let id=values[index];
        let sql='';
        for(i=0;i<keys.length;i++){
            sql=sql+keys[i]+"='"+values[i]+"',";
        }
        let com=sql.substring(0,sql.length-1)
        let sql2=`update "cart" set ${com} where id=$1;`
        let data=[id];
        let result=await pool.query(sql2,data);
        if(result.rowCount>0) return id;
        else  return 0;
    }catch(error){
        console.log(`error (cartmodel->updatecart) : ${error}`)
    }
}

exports.deletecart=async(id)=>{
    try{
        let sql=`delete from "cart" where id=$1;`
    
        let data=[id];
        let result=await pool.query(sql,data);
        if(result.rowCount>0)return id;
        else return 0;
    }catch(error){
        console.log(`error (cartmodel->deletecart) : ${error}`)
    }   
 
}