const { json } = require('body-parser');
const pool = require('../db')
const func = require('../function')
const logger = require('../logger')

exports.addproduct = async (keys, values) => {
    try{
        let product = ['id', 'name', 'image', 'brand', 'description', 'category_id'];
        let specification = ['id', 'product_id', 'color_id', 'flavour_id', 'size_id', 'weight_id', 'shop_id', 'discount'];
        let pid = func.generateUUID();
        let sid = func.generateUUID();
        let j = 0;
        let k = 0;
        let skey = [], pkey = [], svalue = [], pvalue = [];
        
        for (i = 0; i < keys.length; i++) {                         //column identification
            if (product.includes(keys[i])) {
                pkey[j] = keys[i];
                pvalue[j] = values[i];
                j++;
            }
            else if (specification.includes(keys[i]) > 0) {
                skey[k] = keys[i];
                svalue[k] = values[i];
                k++;
            }                                                   //////////////////////
            else continue;
        }
        let nameindex=pkey.indexOf("name")
        let namevalue=pvalue[nameindex]
        if (pkey.includes("name") && namevalue!='') {
            let sql = '', sql2 = '';
            for (i = 0; i < pkey.length; i++) {
                sql = sql + pkey[i] + ",";
                sql2 = sql2 + "'" + pvalue[i] + "',";
            }
            let com1 = sql.substring(0, sql.length - 1)
            let com2 = sql2.substring(0, sql2.length - 1)
            let sqlQuery = `INSERT INTO "product" (id,${com1}) values ($1,${com2});`
            let data = [pid];
            let result = await pool.query(sqlQuery, data);
            if (result.rowCount > 0) {
                let sql3 = '', sql4 = '';
                for (i = 0; i < skey.length; i++) {
                    sql3 = sql3 + skey[i] + ",";
                    sql4 = sql4 + "'" + svalue[i] + "',";
                }
                let com3 = sql3.substring(0, sql3.length - 1)
                let com4 = sql4.substring(0, sql4.length - 1)
                let sqlQuery2 = `INSERT INTO "product_specification" (id,product_id,${com3}) values ($1,$2,${com4});`
                let data2 = [sid, pid];
                let result2 = await pool.query(sqlQuery2, data2);
                if (result2.rowCount > 0) {
                    let Json = {
                        status: 'success',
                        statusCode: 200,
                        message: 'Successfully Executed',
                        data: pid
                    }
                    return Json;
                }
                else {
                    let Json ={
                        status:'error',
                        statusCode:400,
                        message:'error in code in (productandspecification_model->addproduct->result2)',
                        data:[]
                    }
                    return Json;
                }
    
            }
        }
            else {
                let Json = {
                    status: 'error',
                    statusCode: 422,
                    message: 'name not provided, unproccessable entity',
                    data: []
                }
                return Json;
            }
    }catch(error)
    {
        logger.error(`error  (productandspecification_model->addproduct) : ${error.message}`)
    }
    


}

exports.deleteproduct=async(id)=>{
    try{
        let sql=`select product_id from "product_specification" where id=$1`
        let data=[id];
        let result=await pool.query(sql,data)
        let pid=result.rows[0].product_id;
        console.log(pid);
        if(result.rowCount>0)
        {
            let sql1=`delete from "product" where id=$1`
            let data1=[pid]
            let result1=await pool.query(sql1,data1)
            // console.log(result1.rowCount);
            let sql2=`delete from "product_specification" where id=$1`
            let data2=[id];
            let result2=await pool.query(sql2,data2)
            // console.log(result1.rowCount,result2.rowCount>0)
            if(result1.rowCount>0 && result2.rowCount>0)
            {
                // console.log("executed")
                let Json = {
                    status: 'success',
                    statusCode: 200,
                    message: 'deleted the product and its specification',
                    data:pid
                }
                return Json;
            }
            else
            {
                let Json = {
                    status: 'error',
                    statusCode: 400,
                    message: 'Error  (productandspecificationmodel->deleteproduct->if(result1/result2))',
                    data: []
                }
                return Json;
            }
        
        
        }
        else
        {
            let Json = {
                status: 'error',
                statusCode: 422,
                message: 'wrong id provided, false data',
                data: []
            }
            return Json;
        }
    }catch(error){
        logger.error(`error  (productandspecificationmodel->deleteproduct : ${error.message}`)
    }
}