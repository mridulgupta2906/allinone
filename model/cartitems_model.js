const pool=require('../db')
const func=require('../function')

exports.createcartitems=async(keys,values)=>{
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
    let sql=`INSERT INTO "cart_items" (id,${key1}) values ($1,${val1});`;
    let data=[id];
    let sql1= await pool.query(sql,data);
    if(sql1.rowCount>0)return id;
    else return 0;

    }catch(error){
    console.log(`error occured (cartitemsmodel->createcartitems) : ${error}`);}
}

exports.updatecartitems=async(keys,values)=>{
    try{
        let pos=keys.indexOf("id");
        let value=values[pos];
        let com='';
        for(i=0;i<keys.length;i++){
           if(i==pos)continue;
           else com=com+keys[i]+"='"+values[i]+"',";
       }
       com1=com.substring(0,com.length-1);
       let sql=`UPDATE "cart_items" SET ${com1} where id=$1`;
       let data=[value];
       let sql1=await pool.query(sql,data);
       if(sql1.rowCount>0)return value;
       else return 0;
   
    }catch(error){
        console.log('error occured (cartitemsmodel->updatecartitems)  : '+error);
    }
}

exports.deletecartitems=async(id)=>{
    try{
    let sql=`delete from "cart_items" where id=$1;`
    let data=[id];
    let result=await pool.query(sql,data);
    if(result)return id;
    else return 0;
    
    }catch(error){
        console.log(`error (cartitemsmodel->deletecartitems)  : ${error}`)
    }
}