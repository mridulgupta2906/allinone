const pool = require('../db');
const func = require('../function');

module.exports.insertCategory = async(categories)=>
{
    let count = 0;
    let key;
    let result;
    let array = [];
    let sqlQuery = `INSERT INTO "category" (name,id) values($1,$2)`;
    for(let i=0;i<categories.length;i++)
    {
        key = func.generateUUID();
        let data = [categories[i],key];
        result = await pool.query(sqlQuery,data);
        if(result.rowCount>0)
        {
            count++;
            console.log(`Id Generated : ${key}, Name : ${categories[i]},  count : ${count}`);
            array.push({
                Key:key,
                Name: categories[i]
            })
        }
    }
    return array;
}