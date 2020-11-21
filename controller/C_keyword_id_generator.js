
const model = require('../model/M_keyword_id_generator');


module.exports.insertKeyword = async(req,res)=>
{
    try
    {
        let count = 0;
        let keywords = [];
        let array=[];
        console.log("Keyword API Hit")
        let categories = Object.keys(req.body);
        for(let i=0;i<categories.length;i++)
        {
            let categoryName = categories[i];
            let values = req.body[`${categories[i]}`];
            // console.log(values);
            console.log(count++);
            for(let j=0;j<values.length;j++)
            {
                keywords.push(values[j].toLowerCase());
            }
            console.log(`${categories[i]}: ${keywords}`)
            let details = await model.getCategoryId(categoryName);
            let details2 = await model.insertKeyword(details,categoryName,keywords);
            array.push({
                "Category Name" :categoryName,
                CategoryID : details,
                data: details2
            })
            keywords=[];
        }
        // return array;
        return res.json({
            status:"success",
            statusCode:200,
            message :"Id generated successfully",
            data:array
        })
    }
    catch(error)
    {
        console.log(`insertKeyword error : ${error}`)
    }
}

module.exports.getAllKeywords = async(req,res)=>
{
    try
    {   
        let details = await model.getAllKeywords();
        return res.json({
            status:"success",
            statusCode:200,
            message:"fetched successfully",
            count:details.length,
            data:details
        })
    }
    catch(error)
    {
        console.log(`getAllKeywords error : ${error}`);
    }
}