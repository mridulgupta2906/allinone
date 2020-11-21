const pool=require('../db')
const func=require('../function')

exports.createaddress=async(keys,values)=>{
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
        let sql3='INSERT INTO "address"(id,'+sql+')VALUES($1,'+sql2+');';
         let data=[id];
         let result=await pool.query(sql3,data);
        if(result.rowCount>0)return id;
        else return 0;
    }catch(error){
        console.log(`error (addressmodel->createaddress) : ${error}`);
    }
}

exports.updateaddress=async(keys,values)=>{
    try{
        let index=keys.indexOf("id");
        let id=values[index];
        let sql='';
        for(i=0;i<keys.length;i++){
            if(i==index)continue;
            else
            {
                sql=sql+keys[i]+"='"+values[i]+"',";
            }
        }
        let com=sql.substring(0,sql.length-1);
        let sql1=`update "address" set ${com} where id=$1;`
        let data=[id];
        let result=await pool.query(sql1,data);
        if(result.rowCount>0)return id;
        else return 0;
    }catch(error){
        console.log(`error (addressmodel->updateaddress) : ${error}`)
    }
}

exports.deleteaddress=async(id)=>{
    try{
        let sql=`delete from "address" where id=$1;`
        let data=[id];
        let result=await pool.query(sql,data)
        if(result.rowCount>0)return id;
        else return 0;
    }catch(error){
      console.log(`error (addressmodel->deleteaddress) : ${error}`)  
    }
}