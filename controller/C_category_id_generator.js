
const model = require('../model/M_category_id_generator');

module.exports.insertCategory = async(req,res)=>
{
    try
    {
        let categories = Object.keys(req.body);
        console.log(`No. of Category : ${categories.length}`);
        let details = await model.insertCategory(categories);       
        return res.json({
            status :"success",
            statusCode: 200,
            message : "Inserted Successfully",
            data:details
        })
    }
    catch(error)
    {
        console.log(`insertCategory : ${error}`);
    }
}