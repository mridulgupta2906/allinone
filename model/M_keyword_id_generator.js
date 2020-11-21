const pool = require('../db');
const func = require('../function');



module.exports.getCategoryId = async(categoryName) =>
{
    let sql1 = `SELECT key from "category" where name=$1`
    let data = [categoryName];
    let result = await pool.query(sql1,data);
    console.log(result.rows[0].key)
    return result.rows[0].key;
}


module.exports.insertKeyword = async(categoryId,categoryName,keywords)=>
{
    try
    {
        let count =0;
        let array = [];
        for(let i=0;i<keywords.length;i++)
        {
            let key = func.generateUUID();
            let sql = `INSERT INTO "keyword" (key,name,category_id,category_name) values($1,$2,$3,$4)`
            let data = [key,keywords[i],categoryId,categoryName]
            let result = await pool.query(sql,data);
            if(result.rowCount>0)
            {   
                count++;
                console.log(`Key: ${key}, name : ${keywords[i]}, categoryID : ${categoryId}, count : ${count}`)
                array.push({
                    Key:key,
                    Name:keywords[i],
                    categoryId : categoryId,
                    categoryName :categoryName
                })
            }
        }
        return array;
    }
    catch(error)
    {
        console.log(`insertKeyword error : ${error}`)
    }
}

module.exports.getAllKeywords = async()=>
{
    let sql = `select * from "Keywords"`;
    let result = await pool.query(sql);
    return result.rows;
}
